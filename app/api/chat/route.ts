import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// Initialize APIs
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { messages, provider = "gemini" } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // --- OPTION 1: GEMINI ---
    if (provider === "gemini") {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are HELLxCODER AI. Be brief and objective." 
      });

      const result = await model.generateContent(lastMessage);
      const response = await result.response;
      return NextResponse.json({ role: "assistant", content: response.text() });
    }

    // --- OPTION 2: GROQ (Llama 3.3) ---
    if (provider === "groq") {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are HELLxCODER AI. Max efficiency." },
          ...messages
        ],
        model: "llama-3.3-70b-versatile",
      });

      return NextResponse.json({ 
        role: "assistant", 
        content: completion.choices[0]?.message?.content || "" 
      });
    }

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
