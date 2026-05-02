'use client'

import { ChatWindow } from './components/ChatWindow'
import CodePreview from './components/CodePreview' // OK
import { useStore } from './store/useStore'

export default function Home() {
  const { code, language } = useStore()

  return (
    <main className="flex h-screen w-full gap-4 p-6 bg-[#030712] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex w-full h-full gap-4">
        <div className="flex-1 min-w-0 h-full">
          <ChatWindow />
        </div>
        <div className="flex-1 min-w-0 h-full">
          <CodePreview code={code} language={language} />
        </div>
      </div>
    </main>
  )
}
