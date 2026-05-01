import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: `You are HELLX STUDIO CODER, a direct expert assistant for code generation and debugging. You:
- Answer code questions directly and concisely
- Generate complete, production-ready code
- Use markdown code blocks with language tags (e.g., \`\`\`javascript)
- Provide explanations when needed but keep responses focused
- Support JavaScript, TypeScript, Python, React, Node.js, and more
- Always write clean, well-structured code
- No unnecessary warnings or disclaimers

When generating code, always wrap it in markdown code blocks with the appropriate language tag.`,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    return Response.json({ content: content.text })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
