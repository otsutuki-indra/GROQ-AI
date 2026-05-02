'use client'

import { ChatWindow } from './components/ChatWindow'
import { CodePreview } from './components/CodePreview'
import { useStore } from './store/useStore'

export default function Home() {
  const { code, language } = useStore()

  return (
    <main className="flex h-screen gap-4 p-6 bg-[#030712]">
      <div className="flex-1"><ChatWindow /></div>
      <div className="flex-1"><CodePreview code={code} language={language} /></div>
    </main>
  )
}
