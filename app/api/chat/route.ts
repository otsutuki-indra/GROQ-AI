let queue = Promise.resolve();

export async function POST(req: Request) {
  const { message } = await req.json();

  // Add request to queue (prevents parallel spam)
  queue = queue.then(async () => {
    try {
      // Safety: check API key
      if (!process.env.GROQ_API_KEY) {
        return Response.json(
          { reply: "Server misconfigured (no API key)" },
          { status: 500 }
        );
      }

      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
          }),
        }
      );

      // Handle rate limit / API errors
      if (!res.ok) {
        return Response.json(
          { reply: "⚠️ Rate limit hit. Try again in a few seconds." },
          { status: 429 }
        );
      }

      const data = await res.json();

      const reply =
        data?.choices?.[0]?.message?.content ||
        "No response from model.";

      return Response.json({ reply });

    } catch (err) {
      return Response.json(
        { reply: "❌ Server error. Try again later." },
        { status: 500 }
      );
    }
  });

  return queue;
}