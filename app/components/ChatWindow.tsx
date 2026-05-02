'use client'

import { useState, useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Send, Loader2 } from 'lucide-react'

export function ChatWindow() {
  const { messages, addMessage, setCode } = useStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    
    const userMsg = { role: 'user' as const, content: input }
    addMessage(userMsg)
    setInput('')
    setLoading(true)

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
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full glass-panel rounded-[24px] overflow-hidden shadow-2xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-orange-400/40 text-sm font-mono">
            Chat box centar e thakebe Here.. ok Tumi add korba
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-[14px] leading-relaxed ${
              m.role === 'user' ? 'bg-white/10 text-white' : 'text-blue-200'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/5">
        <form onSubmit={handleSubmit} className="flex items-center bg-black/40 border border-white/10 rounded-xl px-4 py-1">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent py-3 outline-none text-sm placeholder:text-white/20 font-mono"
            placeholder="Type command..."
          />
          <button type="submit" disabled={loading} className="p-2">
            {loading ? <Loader2 className="animate-spin text-white/30" size={18} /> : <Send size={18} className="text-white/40" />}
          </button>
        </form>
      </div>
    </div>
  )
}
