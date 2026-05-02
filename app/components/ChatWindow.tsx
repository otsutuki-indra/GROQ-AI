'use client'

import { useState } from 'react'
import { useStore } from '../store/useStore'
import { Send, Loader2 } from 'lucide-react'

export function ChatWindow() {
  const { messages, addMessage, setCode } = useStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

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

      // Regex to extract code for the Preview window
      const codeMatch = data.content.match(/```(\w+)\n([\s\S]*?)```/)
      if (codeMatch) {
        setCode(codeMatch[2].trim(), codeMatch[1])
      }
    } catch (err) {
      console.error("API_ERROR", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full glass-lg rounded-2xl overflow-hidden border border-white/10">
      {/* Chat messages UI code here */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`text-xs font-mono p-3 rounded-lg ${m.role === 'user' ? 'bg-emerald-500/10 ml-auto' : 'bg-white/5'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-emerald-400 focus:outline-none"
          placeholder="Execute..."
        />
        <button type="submit" className="p-2 bg-emerald-500/20 rounded-lg">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4 text-emerald-400" />}
        </button>
      </form>
    </div>
  )
}
