
import { GoogleGenAI } from "@google/genai";

// We assume process.env.API_KEY is available in the execution environment.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.warn("Gemini API key not found in process.env.API_KEY. AI features will be disabled.");
}

export const generateProductDescription = async (productName: string): Promise<string> => {
  if (!ai) {
    return "AI description is not available. API key is missing.";
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Create a sophisticated and enticing tasting note and description for a premium liquor named "${productName}". Keep it under 40 words, focusing on flavour profile and aroma. Make it sound luxurious.`
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    return "Could not generate an AI description at this time.";
  }
};
