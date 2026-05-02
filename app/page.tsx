'use client'

import { ChatWindow } from './components/ChatWindow'
import CodePreview from './components/CodePreview'
import { useStore } from './store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { code } = useStore()

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-between py-10">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_center,rgba(15,23,42,1)_0%,#020408_100%)]" />

      <header className="text-center space-y-2 z-10">
        <h1 className="text-3xl font-bold tracking-[0.5em] text-red-600 flex items-center justify-center gap-2">
          H E L L x C O D E R <span className="text-2xl opacity-90">🧠</span>
        </h1>
        <p className="text-green-400 font-mono text-xs tracking-[0.4em] uppercase">🔌 START WRITEING</p>
      </header>

      <main className="flex-1 w-full max-w-[1500px] flex items-center justify-center px-6 overflow-hidden">
        <motion.div 
          layout
          className={`flex gap-6 w-full transition-all duration-500 ease-out ${code ? 'max-w-full' : 'max-w-[800px]'}`}
        >
          <div className="flex-1 h-[65vh] min-w-0">
            <ChatWindow />
          </div>
          <AnimatePresence>
            {code && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 h-[65vh] min-w-0"
              >
                <CodePreview />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer className="text-center space-y-1 z-10 select-none">
        <p className="text-white/40 font-light tracking-[0.3em] text-[10px]">➜ made By HELLXSTUDIO.</p>
        <p className="text-red-700/70 text-[9px] uppercase font-bold tracking-widest">All rights reversed</p>
      </footer>
    </div>
  )
}
