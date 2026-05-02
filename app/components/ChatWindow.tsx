'use client'

import { useState, useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Send, Sparkles, User } from 'lucide-react'

export function ChatWindow() {
  const { messages, addMessage, setCode } = useStore()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const msg = { role: 'user' as const, content: input }
    addMessage(msg)
    setInput('')
    
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, msg] }),
    })
    const data = await res.json()
    addMessage({ role: 'assistant', content: data.content })
    
    const match = data.content.match(/```(\w+)\n([\s\S]*?)```/)
    if (match) setCode(match[2].trim(), match[1])
  }

  return (
    <div className="flex flex-col h-full glass-panel rounded-[32px] overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-4 text-white/20">
            <Sparkles className="w-12 h-12" />
            <p className="text-sm tracking-widest uppercase font-light">Hello, I'm Hellx. How can I help?</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              m.role === 'user' ? 'bg-white/10' : 'bg-blue-500/20'
            }`}>
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-blue-400" />}
            </div>
            <div className={`px-5 py-3 rounded-2xl text-[15px] leading-relaxed max-w-[80%] ${
              m.role === 'user' ? 'bg-white/5 border border-white/10' : 'text-zinc-200'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-t from-black/40 to-transparent">
        <form onSubmit={handleSend} className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-2 focus-within:border-white/20 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent py-4 outline-none text-sm placeholder:text-white/20"
            placeholder="Ask anything..."
          />
          <button type="submit" className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <Send className="w-5 h-5 text-white/40" />
          </button>
        </form>
      </div>
    </div>
  )
}
