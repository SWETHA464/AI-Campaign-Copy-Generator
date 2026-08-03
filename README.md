# 🤖 AI Campaign Copy Generator

An AI-powered marketing content generation application that creates professional campaign copy from simple product and campaign details.

The application allows users to provide information such as the product name, product description, offer, target audience, campaign objective and preferred tone. The application then uses a locally running Qwen 2.5:3B Large Language Model through Ollama to generate marketing content in multiple formats.

The generated content includes email subject lines, email preview texts, promotional email content, WhatsApp messages and SMS messages.

---

## 📌 Project Overview

The project is built using a React + FastAPI + Ollama architecture.

The frontend collects campaign requirements from the user and sends them to the FastAPI backend. The backend validates the request, builds a structured prompt using the provided information and sends it to the locally running Qwen 2.5 3B model through Ollama. The AI-generated response is returned in JSON format, processed by the backend and displayed in the React application. Since the model runs locally using Ollama, no external AI API key is required.

---

## 🏗️ Architecture

<img width="985" height="731" alt="image" src="https://github.com/user-attachments/assets/9c61f5fe-e16b-4e0e-b7c5-f9ad95679707" />

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* Tailwind CSS
* React Icons
* React Hot Toast
* Browser Clipboard API
* Fetch API

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn
* Ollama

### AI Model

* Qwen 2.5 3B
* Served locally through Ollama

---

# ⚙️ Installation and Setup

## 1. Prerequisites

Make sure the following are installed:

* Python 3.10+
* Node.js and npm
* Git
* Ollama
---

## 2. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project directory:

```bash
cd AI-Campaign-Copy-Generator
```

---

# 🧠 Backend Setup

## 3. Create a Python Virtual Environment

Move to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

---

## 4. Install Python Dependencies

Install the required packages:

```bash
pip install fastapi uvicorn pydantic ollama
```

---

# 🤖 Ollama and Qwen Setup

## 5. Install Ollama

Install Ollama on your system. After installation, verify it:

```bash
ollama --version
```

---

## 6. Download the Qwen Model

The project uses:

```text
qwen2.5:3b
```

Download the model using:

```bash
ollama pull qwen2.5:3b
```

---

# 🚀 Running the Backend

From the `backend` directory, run:

```bash
uvicorn main:app --reload
```

The FastAPI server should start at:

```text
http://127.0.0.1:8000
```


---

# 🎨 Frontend Setup

## 7. Install Frontend Dependencies

Open another terminal.

Move to the frontend directory:

```bash
cd frontend
```

Install the npm dependencies:

```bash
npm install
```

---

## 8. Start the React Application

Run:

```bash
npm run dev
```

Vite will provide a local development URL, normally:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# 📌 Important Notes

* Make sure Ollama is installed and running before generating campaigns.
* Make sure the `qwen2.5:3b` model has been downloaded using `ollama pull qwen2.5:3b`.
* Start the FastAPI backend before using the Generate Campaign button.
* Start the React frontend separately using Vite.
* The backend currently allows requests from `http://localhost:5173`.
* If the frontend runs on a different port, update the CORS configuration in the FastAPI backend.
