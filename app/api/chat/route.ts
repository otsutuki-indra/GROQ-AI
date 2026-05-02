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
        { content: "SYSTEM_CRITICAL: MISSING_API_KEY" },
        { status: 500 }
      );
    }

    // Using Llama-3.3-70b for maximum reasoning power
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", 
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
      temperature: 0.2, // Precision focus
      max_tokens: 4096, // Increased for complex logic
      top_p: 1,
      stream: false,
    });

    const aiResponse = response.choices[0]?.message?.content || "ERROR: EMPTY_RESPONSE";

    return NextResponse.json({ content: aiResponse });
  } catch (error: any) {
    console.error("GROQ_API_FAILURE:", error);
    
    // Handle specific decommissioned or rate limit errors
    const errorMessage = error.message || "UNKNOWN_SYSTEM_ERROR";
    return NextResponse.json(
      { content: `SYSTEM_FAILURE: ${errorMessage}` },
      { status: 500 }
    );
  }
}
