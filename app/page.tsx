'use client'

import { ChatWindow } from './components/ChatWindow'
import CodePreview from './components/CodePreview'
import { useStore } from './store/useStore'

export default function Home() {
  const { code } = useStore()

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      {/* Minimal Header */}
      <header className="h-16 flex items-center px-8">
        <h1 className="text-sm font-medium tracking-widest text-white/40 uppercase">
          Hellx <span className="text-white/80">Coder</span>
        </h1>
      </header>

      {/* Main Container - Centered Chat */}
      <main className="flex-1 flex justify-center overflow-hidden p-4 md:pb-8">
        <div className={`transition-all duration-500 ease-in-out flex gap-6 ${
          code ? 'w-full max-w-[1400px]' : 'w-full max-w-[800px]'
        }`}>
          
          {/* Chat Window is always centered when code is absent */}
          <div className="flex-1 h-full min-w-0">
            <ChatWindow />
          </div>
          
          {/* Code Preview slides in from the right */}
          {code && (
            <div className="flex-1 h-full min-w-0 animate-in fade-in slide-in-from-right-8 duration-500">
              <CodePreview code={code} language="typescript" />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
