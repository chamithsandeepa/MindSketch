import fetch from "node-fetch";
import userModel from "../models/userModel.js";

const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

export const generateImage = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.creditBalance <= 0) {
      return res.json({ success: false, message: "Insufficient credits" });
    }

    console.log(`Generating image for user: ${user.name} | Prompt: ${prompt}`);

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", errorText);
      return res.json({ success: false, message: errorText });
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    // Deduct 1 credit
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { creditBalance: user.creditBalance - 1 },
      { new: true }
    );

    res.json({
      success: true,
      message: "Image generated successfully",
      creditBalance: updatedUser.creditBalance,
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

//new folder
