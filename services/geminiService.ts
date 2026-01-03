
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSustainabilityTips(topic: string = "general waste management") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 practical, short sustainability tips for users in Kenya focusing on ${topic}. Include community impact.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ["title", "content", "category"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [
      { title: "Compost at Home", content: "Use food scraps to create rich soil for your garden.", category: "Organic" },
      { title: "Rinse Plastics", content: "Clean your plastic containers to ensure they are recyclable.", category: "Plastic" }
    ];
  }
}

export async function generateConfirmationSms(pickupId: string, wasteType: string, earnings: number) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft a short, professional SMS for Kifalme Waste Management. 
      Pickup ID: ${pickupId}
      Waste: ${wasteType}
      Est. Payout: KES ${earnings}
      Tone: Helpful, Kenyan-focused. Include an arrival window of 2-4 hours.`,
    });
    return response.text;
  } catch {
    return `Kifalme: Your pickup ${pickupId} is confirmed! Our driver will arrive in 2-4 hours. Est. payout: KES ${earnings}. Asante!`;
  }
}

export async function getLocalEcoNews() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What are the latest 3 circular economy and environmental news stories in Kenya for 2024/2025?",
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    const summaryResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transform this news info into a JSON list of 3 items with 'title', 'source', and 'url': ${response.text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              source: { type: Type.STRING },
              url: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(summaryResponse.text);
  } catch (error) {
    return [];
  }
}

export async function analyzeWasteImage(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Analyze this image. Identify the waste category (Carton, Plastic, Metal, Glass, or Textile) and estimate its weight in kg if possible. Return JSON with 'category', 'estimatedWeight', and 'advice'." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            estimatedWeight: { type: Type.NUMBER },
            advice: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { category: "Unknown", advice: "Please enter details manually." };
  }
}

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are Kifalme Rafiki, a helpful Kenyan assistant for Kifalme Waste Management. You help users recycle, understand rewards, and live sustainably. Use a friendly, professional tone with occasional Swahili greetings like Jambo or Asante.',
    }
  });
  const result = await chat.sendMessage({ message });
  return result.text;
}
