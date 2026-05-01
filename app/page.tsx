'use client'

import { useState } from 'react'
import { ChatWindow } from '@/components/ChatWindow'
import { CodePreview } from '@/components/CodePreview'

export default function Home() {
  const [code, setCode] = useState<string>('')
  const [language, setLanguage] = useState<string>('javascript')

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Brand Header */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg glass-lg flex items-center justify-center">
            <span className="text-emerald-400 font-bold text-lg">⚡</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-lg tracking-tight">
              HELLX
              <span className="gradient-text">_CODER</span>
            </h1>
            <p className="text-[10px] text-emerald-400/60 font-mono">Direct Expert Assistant</p>
          </div>
        </div>
      </div>

      {/* Main Layout: Chat on Left, Preview on Right */}
      <div className="w-full h-full flex gap-4 p-6 pt-24">
        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatWindow 
            onCodeGenerated={(newCode, lang) => {
              setCode(newCode)
              setLanguage(lang)
            }}
          />
        </div>

        {/* Code Preview Window */}
        <div className="flex-1 flex flex-col min-w-0">
          <CodePreview code={code} language={language} />
        </div>
      </div>

      {/* Decorative aurora accent (bottom right) */}
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-900/20 via-transparent to-transparent rounded-full filter blur-3xl animate-pulse-slow" />
      </div>
    </div>
  )
}
