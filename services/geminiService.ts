
import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE, SYSTEM_PROMPT } from '../constants';
import { OracleResponse } from '../types';

// Assume API_KEY is set in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askOracle = async (question: string): Promise<OracleResponse> => {
  const fullPrompt = `
    ${SYSTEM_PROMPT}

    --- KNOWLEDGE BASE START ---
    ${KNOWLEDGE_BASE}
    --- KNOWLEDGE BASE END ---

    --- USER QUESTION ---
    ${question}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text.trim();
    const cleanedJsonString = responseText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const parsedResponse: OracleResponse = JSON.parse(cleanedJsonString);

    if (!parsedResponse.answer_html || !Array.isArray(parsedResponse.product_recommendations)) {
      throw new Error("Invalid response format from Oracle.");
    }
    
    return parsedResponse;

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof SyntaxError) {
      throw new Error('The Oracle provided a malformed response. It seems even divine beings have syntax errors. Please try again.');
    }
    throw new Error('Failed to get a response from the Oracle. It might be contemplating the absurdity of it all, or the server is just busy. Please try again in a moment.');
  }
};
