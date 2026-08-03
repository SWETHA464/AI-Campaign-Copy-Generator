import json
import ollama
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CampaignRequest(BaseModel):
    product_name: str
    product_description: str
    offer: str
    target_audience: str
    campaign_objective: str
    tone: str


def build_prompt(data: CampaignRequest):

    return f"""
You are an expert marketing copywriter.

Generate marketing content for the following product.

Return ONLY valid JSON.

Do NOT add markdown.
Do NOT use ```json.
Do NOT write explanations.
Do NOT include any extra text before or after the JSON.

Return EXACTLY in this format:

{{
  "email_subjects": [
    "Subject 1",
    "Subject 2",
    "Subject 3",
    "Subject 4",
    "Subject 5"
  ],

  "preview_texts": [
    "Preview Text 1",
    "Preview Text 2",
    "Preview Text 3"
  ],

  "promotional_email": "Promotional Email",

  "whatsapp_message": "WhatsApp Message",

  "sms": "SMS Message"
}}

Rules:

1. Generate EXACTLY 5 unique email subject lines.
2. Generate EXACTLY 3 unique email preview texts.
3. Promotional email should be under 120 words.
4. WhatsApp message should be under 40 words.
5. SMS should be under 20 words.
6. Keep the tone consistent.
7. Return ONLY valid JSON.

Product Name:
{data.product_name}

Product Description:
{data.product_description}

Offer:
{data.offer}

Target Audience:
{data.target_audience}

Campaign Objective:
{data.campaign_objective}

Tone:
{data.tone}
"""


def generate_campaign(prompt):

    response = ollama.chat(
        model="qwen2.5:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        options={
            "temperature": 0.6,
            "top_p": 0.9,
            "top_k": 20,
            "num_predict": 600
        }
    )

    content = response["message"]["content"]

    try:

        result = json.loads(content)

        # Enforce required number of items
        result["email_subjects"] = result.get("email_subjects", [])[:5]
        result["preview_texts"] = result.get("preview_texts", [])[:3]

        return result

    except json.JSONDecodeError:

        print("\nJSON Parsing Failed\n")

        return {
            "email_subjects": [],
            "preview_texts": [],
            "promotional_email": content,
            "whatsapp_message": "",
            "sms": ""
        }


@app.post("/api/campaign")
def generate(request: CampaignRequest):

    prompt = build_prompt(request)

    result = generate_campaign(prompt)

    return result