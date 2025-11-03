import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE, SYSTEM_PROMPT } from "../constants";
import { OracleResponse } from "../types";

// Read key from Vite env injected at build time
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY as string });

export const askOracle = async (question: string): Promise<OracleResponse> => {
  const fullPrompt = `
${SYSTEM_PROMPT}

--- KNOWLEDGE BASE START ---
${KNOWLEDGE_BASE}
--- KNOWLEDGE BASE END ---

--- USER QUESTION ---
${question}
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: fullPrompt }]}],
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const responseText = (await response.text()).trim();
    const cleanedJsonString = responseText
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "");
    const parsed: OracleResponse = JSON.parse(cleanedJsonString);

    if (!parsed.answer_html || !Array.isArray(parsed.product_recommendations)) {
      throw new Error("Invalid response format from Oracle.");
    }

    return parsed;
  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof SyntaxError) {
      throw new Error(
        "The Oracle provided a malformed response. It seems even divine beings have syntax errors. Please try again."
      );
    }
    throw new Error(
      "Failed to get a response from the Oracle. It might be contemplating the absurdity of it all, or the server is just busy. Please try again in a moment."
    );
  }
};
