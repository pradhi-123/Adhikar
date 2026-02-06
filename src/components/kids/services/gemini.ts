
import { GoogleGenAI, Type } from "@google/genai";
import { Language, AIResponse, ScenarioRound } from "../types";

const aiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLegalAdvice = async (issue: string, lang: Language): Promise<AIResponse> => {
  const ai = aiClient();
  const systemPrompt = `
    You are "Justice Bot", a friendly and supportive legal assistant for Indian juveniles (ages 10-17).
    Your goal is to explain legal rights and steps in a way a child can understand.
    Tone: Calm, supportive, empowering, non-graphic.
    Language: ${lang === 'hi' ? 'Hindi' : lang === 'ta' ? 'Tamil' : 'English'}.
    Structure: whatIsHappening, yourRight, whatYouCanDo, needHelp.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: issue,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            whatIsHappening: { type: Type.STRING },
            yourRight: { type: Type.STRING },
            whatYouCanDo: { type: Type.ARRAY, items: { type: Type.STRING } },
            needHelp: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["whatIsHappening", "yourRight", "whatYouCanDo", "needHelp"]
        }
      }
    });
    return JSON.parse(response.text || '{}') as AIResponse;
  } catch (error) {
    console.error("AI Error:", error);
    return {
      whatIsHappening: "I'm having trouble connecting to my law books right now.",
      yourRight: "You always have the right to be safe.",
      whatYouCanDo: ["Talk to an adult.", "Call 1098."],
      needHelp: ["1098", "112"]
    };
  }
};

export const generateNextAdventureRound = async (
  scenarioTitle: string,
  category: string,
  history: string[],
  lang: Language
): Promise<ScenarioRound> => {
  const ai = aiClient();
  const systemPrompt = `
    You are a Scenario Designer for "Adhikar", a legal app for Indian kids (10-17).
    Task: Generate the NEXT round of an interactive adventure.
    Theme: ${scenarioTitle} (${category}).
    History of what already happened: ${history.join(" | ")}.
    
    Rules:
    1. DO NOT REPEAT any scenario or question from the history.
    2. Make it a logical "Next Step" or a related new problem in the same theme.
    3. The question must have 3 options. 
    4. One option is "Best" (10 pts), one is "Good" (5 pts), one is "Bad/Wait" (0 pts).
    5. Include a "feedback" and a legal "explanation" based on Indian Laws (POCSO, IT Act, Child Labor Act, Anti-Ragging regulations).
    6. Tone: Engaging and educational.
    7. Language: ${lang === 'hi' ? 'Hindi' : lang === 'ta' ? 'Tamil' : 'English'}.

    Return ONLY JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a new complex round for this adventure.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.NUMBER },
            text: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  feedback: { type: Type.STRING },
                  points: { type: Type.NUMBER },
                  explanation: { type: Type.STRING }
                },
                required: ["text", "feedback", "points", "explanation"]
              }
            }
          },
          required: ["id", "text", "options"]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return parsed as ScenarioRound;
  } catch (error) {
    console.error("Round Gen Error:", error);
    throw error;
  }
};

export const translateScenarioRounds = async (
  rounds: ScenarioRound[],
  targetLang: Language
): Promise<ScenarioRound[]> => {
  const ai = aiClient();
  const systemPrompt = `
    You are a translator for "Adhikar". 
    Task: Translate the following array of legal adventure rounds.
    Target Language: ${targetLang === 'hi' ? 'Hindi' : targetLang === 'ta' ? 'Tamil' : 'English'}.
    Maintain all IDs and Points exactly as they are.
    Ensure legal terminology remains accurate for a child to understand.
    Return ONLY a JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: JSON.stringify(rounds),
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.NUMBER },
              text: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    feedback: { type: Type.STRING },
                    points: { type: Type.NUMBER },
                    explanation: { type: Type.STRING }
                  },
                  required: ["text", "feedback", "points", "explanation"]
                }
              }
            },
            required: ["id", "text", "options"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Translation Error:", error);
    return rounds; // Fallback to untranslated if error
  }
};
