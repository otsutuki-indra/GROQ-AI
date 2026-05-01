'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

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
      content: 'Hey 👋 I\'m HELLX_CODER. Send me code requests, questions, or problems. I\'ll generate solutions and show them in the preview panel.',
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
  }, [messages])

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
        id: Date.now().toString() + '1',
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Extract code from response if present
      const codeMatch = data.content.match(/```(\w+)\n([\s\S]*?)```/)
      if (codeMatch) {
        onCodeGenerated(codeMatch[2].trim(), codeMatch[1])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '2',
          role: 'assistant',
          content: '❌ Error sending message. Please try again.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-lg h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">Chat</h2>
        </div>
        <div className="text-[10px] text-emerald-400/60 px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/20">
          Live
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full glass flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-3 rounded-lg text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'glass bg-emerald-400/10 border-emerald-400/30 text-white'
                    : 'glass text-white/80'
                }`}
              >
                <p className="whitespace-pre-wrap break-words font-mono text-xs">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 items-center"
          >
            <div className="w-6 h-6 rounded-full glass flex items-center justify-center">
              <Loader2 className="w-3 h-3 text-emerald-400 animate-spin" />
            </div>
            <div className="glass px-4 py-3 rounded-lg">
              <p className="text-xs text-white/60">Thinking...</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 px-6 py-4 flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="flex-1 glass bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="glass px-4 py-3 rounded-lg hover:bg-emerald-400/10 hover:border-emerald-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 text-emerald-400" />
        </button>
      </form>
    </div>
  )
}
