import { GoogleGenAI } from "@google/genai";

// Lazy initialization for safe deployment
let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn("GEMINI_API_KEY is not defined. AI features will be unavailable.");
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
};

export const getGeminiModel = (modelName = "gemini-3-flash-preview") => {
  const ai = getAI();
  if (!ai) {
    return async () => ({ text: "AI Configuration missing." });
  }
  return ai.models.generateContent.bind(ai.models);
};
