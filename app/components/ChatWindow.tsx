'use client'
import { useState } from 'react'
import { useStore } from '../store/useStore'
import { Send, Sparkles } from 'lucide-react'

export function ChatWindow() {
  const { messages, addMessage, setCode } = useStore()
  const [input, setInput] = useState('')

  const handleAction = async (e: React.FormEvent) => {
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
    <div className="h-full glass-window flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar text-center">
        {messages.length === 0 && (
          <p className="text-orange-400/60 mt-20 text-sm">Chat box centar e thakebe Here.. ok Tumi add korba</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-white/5 border border-white/10' : 'text-blue-300'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleAction} className="p-4 bg-white/5 border-t border-white/5 flex gap-3">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          className="flex-1 bg-transparent outline-none text-sm font-light"
        />
        <button type="submit" className="text-white/40 hover:text-white transition-colors">
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
