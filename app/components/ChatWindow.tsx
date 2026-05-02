'use client'

import { useState, useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Send, Loader2, Terminal } from 'lucide-react'

export function ChatWindow() {
  const { messages, addMessage, setCode } = useStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
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
      const content = data.content || "ERROR: NO_RESPONSE"
      
      addMessage({ role: 'assistant', content })

      // Regex logic to extract code blocks
      const codeMatch = content.match(/```(\w+)\n([\s\S]*?)```/)
      if (codeMatch) {
        setCode(codeMatch[2].trim(), codeMatch[1])
      }
    } catch (err) {
      addMessage({ role: 'assistant', content: "SYSTEM_FAILURE: API_UNREACHABLE" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full glass-lg rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Terminal v1.0.0</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-xl font-mono text-[13px] leading-relaxed ${
              m.role === 'user' 
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-100' 
                : 'bg-white/5 border border-white/10 text-zinc-300'
            }`}>
              <span className="block text-[10px] mb-2 opacity-50 uppercase tracking-tighter">
                {m.role === 'user' ? '>> User' : '>> HELLX_CODER'}
              </span>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] animate-pulse">
            <Loader2 className="w-3 h-3 animate-spin" />
            EXECUTING_LOGIC...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-black/20 border-t border-white/10 flex gap-3">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] text-white font-mono placeholder:text-zinc-600"
          placeholder="Enter command or query..."
          autoFocus
        />
        <button 
          type="submit" 
          disabled={loading}
          className="p-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors rounded-lg border border-emerald-500/30 text-emerald-400"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
