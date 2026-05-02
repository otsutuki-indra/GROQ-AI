'use client'

import { useState, useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Send, Sparkles } from 'lucide-react'

export function ChatWindow() {
  const { messages, addMessage, setCode } = useStore()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const userMsg = { role: 'user' as const, content: input }
    addMessage(userMsg)
    setInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      addMessage({ role: 'assistant', content: data.content })
      
      const match = data.content.match(/```(\w+)\n([\s\S]*?)```/)
      if (match) setCode(match[2].trim(), match[1])
    } catch (err) { console.error(err) }
  }

  return (
    <div className="flex flex-col h-full glass-effect rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
            <Sparkles className="w-12 h-12 mb-4" />
            <p className="text-xl font-light">HELLX CODER</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-6 py-3 rounded-[24px] text-base ${
              m.role === 'user' ? 'bg-[#2b2b2b] text-white shadow-lg' : 'text-zinc-200'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6">
        <form onSubmit={onSend} className="bg-white/5 border border-white/10 rounded-full flex items-center px-6 py-2 focus-within:border-white/20 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent py-3 outline-none text-sm placeholder:text-zinc-500"
            placeholder="Type your query..."
          />
          <button type="submit" className="p-2 hover:bg-white/5 rounded-full">
            <Send className="w-5 h-5 text-zinc-400" />
          </button>
        </form>
      </div>
    </div>
  )
}
