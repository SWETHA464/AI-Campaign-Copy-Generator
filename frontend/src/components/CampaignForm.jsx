import { useState } from "react";

function CampaignForm({
    setCampaign,
    loading,
    setLoading,
}) {
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    offer: "",
    target_audience: "",
    campaign_objective: "",
    tone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/campaign",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        setCampaign(data);

    } catch (error) {

        console.error(error);

        alert("Error generating campaign.");

    } finally {

        setLoading(false);

    }
};

const inputStyle =
  "w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 focus:bg-blue-50";

  return (
    <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-blue-100">
      <div className="text-center mb-8">

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI Campaign Copy Generator
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Generate professional marketing content powered by AI
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-2">
            Product Name
          </label>

          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className={inputStyle}
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-semibold mb-2">
            Product Description
          </label>

          <textarea
            name="product_description"
            value={formData.product_description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            required
            className={inputStyle}
          />
        </div>

        {/* Offer */}
        <div>
          <label className="block font-semibold mb-2">
            Offer
          </label>

          <input
            type="text"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
            placeholder="e.g. 20% OFF"
            required
            className={inputStyle}
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="block font-semibold mb-2">
            Target Audience
          </label>

          <input
            type="text"
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
            placeholder="e.g. College students"
            required
            className={inputStyle}
          />
        </div>

        {/* Campaign Objective */}
        <div>
          <label className="block font-semibold mb-2">
            Campaign Objective
          </label>

          <input
            type="text"
            name="campaign_objective"
            value={formData.campaign_objective}
            onChange={handleChange}
            placeholder="e.g. Increase online sales during the festive season"
            required
            className={inputStyle}
          />
        </div>
        
        {/* Tone */}
        <div>
          <label className="block font-semibold mb-2">
            Tone
          </label>

          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            required
            className={inputStyle}
          >
            <option value="">Select Tone</option>
            <option value="Friendly">Friendly</option>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Energetic and Persuasive">Energetic and Persuasive</option>
            <option value="Luxury and Premium">Luxury and Premium</option>
            <option value="Exciting">Exciting</option>
            <option value="Humorous">Humorous</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
            {loading ? "Generating..." : "Generate Campaign"}
        </button>
      </form>
    </div>
  );
}

export default CampaignForm;