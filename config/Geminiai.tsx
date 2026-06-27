// import { GoogleGenerativeAI } from '@google/generative-ai';

// const apiKey = process.env.GEMINI_API_KEY;
// console.log("API Key exists:", !!process.env.GEMINI_API_KEY);
// if (!apiKey) {
//   throw new Error("GEMINI_API_KEY is missing");
// }

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
// });
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

export const ai = new GoogleGenAI({
  apiKey,
  });
// });const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: 'application/json',
// };

