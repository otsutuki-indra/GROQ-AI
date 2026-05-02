'use client'
import { ChatWindow } from './components/ChatWindow'
import { useStore } from './store/useStore'
import { motion } from 'framer-motion'

export default function Home() {
  const { code } = useStore()

  return (
    <main className="h-screen w-full flex flex-col items-center justify-between p-10">
      {/* Header from Demo */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-[0.5em] text-red-500 flex items-center justify-center gap-2">
          H E L L X C O D E R <span className="text-2xl">🎯</span>
        </h1>
        <p className="text-green-400 font-mono text-sm tracking-widest">START WRITE.ING</p>
      </div>

      {/* Centered Chat Window */}
      <div className={`w-full transition-all duration-700 flex gap-6 ${code ? 'max-w-[1400px]' : 'max-w-[800px]'}`}>
        <div className="flex-1 h-[500px]">
          <ChatWindow />
        </div>
      </div>

      {/* Footer from Demo */}
      <footer className="text-center space-y-1 opacity-50">
        <p className="text-white font-light tracking-widest text-xs">
          ➜ made By HELLXSTUDIO.
        </p>
        <p className="text-red-600 text-[10px] uppercase">All rights reversed</p>
      </footer>
    </main>
  )
}
