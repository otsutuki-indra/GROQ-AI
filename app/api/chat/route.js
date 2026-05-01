import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { 
            role: "system", 
            content: "You are an Expert System Architect. Output ONLY clean, production-ready React code blocks using Tailwind CSS. No conversational filler. No explanations. Use dark themes for all UI components you generate." 
          },
          ...messages,
        ],
        temperature: 0.1, 
      }),
    });

    const data = await response.json();
    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    return NextResponse.json({ error: "Execution Failed" }, { status: 500 });
  }
}