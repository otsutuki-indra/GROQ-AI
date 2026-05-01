'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatWindowProps {
  onCodeGenerated: (code: string, language: string) => void
}

export function ChatWindow({ onCodeGenerated }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'SYSTEM_READY: HELLX_CODER active. Send request.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || 'ERROR: NULL_RESPONSE',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      const codeMatch = data.content?.match(/```(\w+)\n([\s\S]*?)```/)
      if (codeMatch) {
        onCodeGenerated(codeMatch[2].trim(), codeMatch[1])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: 'CRITICAL_FAILURE: API_UNREACHABLE',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-lg h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      {/* Terminal Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-tighter">Terminal_Output</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">ENCRYPTED_LINK</span>
        </div>
      </div>

      {/* Message Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-4 py-2 rounded-lg text-xs font-mono border ${
                msg.role === 'user'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-white/5 border-white/10 text-zinc-300'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex items-center gap-2 animate-pulse">
            <Loader2 className="w-3 h-3 text-emerald-400 animate-spin" />
            <span className="text-[10px] font-mono text-emerald-400/50 uppercase">Syncing...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Execute command..."
          className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-lg transition-all disabled:opacity-20"
        >
          <Send className="w-4 h-4 text-emerald-400" />
        </button>
      </form>
    </div>
  )
}
