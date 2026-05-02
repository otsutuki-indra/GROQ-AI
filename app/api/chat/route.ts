import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", 
      messages: [
        {
          role: "system",
          content: `Identity: HELLX_CODER. 
          Vibe: Friendly, casual, and helpful (No more robotic/brutal vibe). 
          Language: Natural Banglish (Mix of Bangla & English). 
          Rules:
          - Respond like a human peer, not a script.
          - Use emojis naturally (not just rocket/target).
          - Ami ja bolbo tai korbe (Strictly follow user instructions).
          - Do NOT write code unless explicitly asked for it.
          - Keep answers concise but conversational.`
        },
        ...messages,
      ],
      temperature: 0.7, // Increased for more natural/casual flow
      max_tokens: 2048,
    });

    return NextResponse.json({ content: response.choices[0]?.message?.content });
  } catch (error: any) {
    return NextResponse.json({ content: "SYSTEM_ERROR: Check API Key" }, { status: 500 });
  }
}
