import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

// Initialize Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { content: "CRITICAL_ERROR: MISSING_API_KEY" },
        { status: 500 }
      );
    }

    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192", // Llama 3 for high reasoning
      messages: [
        {
          role: "system",
          content: `Identity: HELLX_CODER. 
          Vibe: Maximum efficiency, brutal objectivity. 
          Language: Mix of Bold English and Bangla (Banglish style). 
          Rules: No greetings, no fluff, strict accuracy. 
          Structure: Summary first, then punchy bullet points. 
          Code: Wrap ALL code in triple backticks with language name. 
          Style: Short sentences only. Use 🚀 and 🎯.`
        },
        ...messages,
      ],
      temperature: 0.2, // Low temperature for factual precision
      max_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    const aiResponse = response.choices[0]?.message?.content || "ERROR: EMPTY_RESPONSE";

    return NextResponse.json({ content: aiResponse });
  } catch (error: any) {
    console.error("GROQ_API_FAILURE:", error);
    return NextResponse.json(
      { content: `SYSTEM_FAILURE: ${error.message}` },
      { status: 500 }
    );
  }
}
