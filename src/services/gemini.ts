import { GoogleGenAI } from "@google/genai";

// Standard initialization for AI Studio environment
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGeminiModel = (modelName = "gemini-3-flash-preview") => {
  return ai.models.generateContent.bind(ai.models);
};
