'use client'

import { ChatWindow } from './components/ChatWindow'
import CodePreview from './components/CodePreview'
import { useStore } from './store/useStore'
import { Terminal, Cpu } from 'lucide-react'

export default function Home() {
  const { code, language } = useStore()

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#020617]">
      {/* Header Bar */}
      <header className="h-14 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
            <Cpu className="w-5 h-5 text-emerald-400" />
          </div>
          <h1 className="font-mono text-sm font-bold tracking-tighter text-white">
            HELLX_CODER <span className="text-emerald-500">v1.1.0</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> API_STABLE</span>
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> LLAMA_3.3_READY</span>
        </div>
      </header>

      {/* Workspace Area */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        <div className="w-[450px] flex-shrink-0">
          <ChatWindow />
        </div>
        <div className="flex-1 min-w-0">
          <CodePreview code={code} language={language} />
        </div>
      </main>
    </div>
  )
}
