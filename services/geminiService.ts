import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePlanetFacts = async (planetName: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "请配置 API Key 以获取 AI 介绍。";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 3 interesting and scientific fun facts about the planet ${planetName}. Format the output as a simple Markdown list in Chinese (Simplified). Keep it concise and engaging for a general audience.`,
    });

    return response.text || "暂无数据。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "获取数据时出错，请稍后再试。";
  }
};