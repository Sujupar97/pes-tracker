import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");

        // Define the model (Gemini 1.5 Flash is fast and good for vision)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Analiza esta captura de pantalla de un resultado de partido de eFootball (PES Mobile).
      Necesito extraer todos los datos estadísticos y el resultado.
      
      Los jugadores posibles (Dueños de los equipos) son tres amigos. Trata de deducir quién es quién basado en los nombres de equipo si es posible, o devuelve 'unknown'.
      Nombres de equipos comunes: 
      - Julián (Suele usar Flamengo, o nombres como 'Julian Parra')
      - Andrés (Suele usar Manchester United, FC Legends, o 'Andrés')
      - Nicolás (Suele usar Red Star, o 'SU PESADILLA F.C.')

      Devuelve un JSON ESTRICTO con la siguiente estructura, sin bloques de código markdown:
      {
        "home_team_name": "string",
        "away_team_name": "string",
        "home_score": number,
        "away_score": number,
        "match_type": "regular" | "extra" | "penalties",
        "home_penalty_score": number (si aplica, sino null),
        "away_penalty_score": number (si aplica, sino null),
        "winner_guess": "Julián" | "Andrés" | "Nicolás" | "Unknown",
        "stats": {
          "home_possession": number (solo el numero, ej 55),
          "away_possession": number,
          "home_shots": number,
          "away_shots": number,
          "home_passes": number,
          "away_passes": number,
          "home_interceptions": number,
          "away_interceptions": number
        }
      }
    `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: file.type,
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean code blocks if present
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const json = JSON.parse(cleanedText);

        return NextResponse.json(json);
    } catch (error) {
        console.error("Error analyzing image:", error);
        return NextResponse.json(
            { error: "Failed to analyze image" },
            { status: 500 }
        );
    }
}
