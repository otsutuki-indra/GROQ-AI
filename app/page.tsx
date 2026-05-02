'use client'

import { ChatWindow } from './components/ChatWindow'
import CodePreview from './components/CodePreview'
import { useStore } from './store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { code } = useStore()

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden">
      <div className="space-bg" />
      
      <header className="h-16 flex items-center px-10 z-20">
        <h1 className="text-lg font-light tracking-[0.2em] text-white/60">
          HELLX <span className="text-white font-medium">CODER</span>
        </h1>
      </header>

      <main className="flex-1 flex justify-center items-center p-6 z-10">
        <motion.div 
          layout
          className={`flex gap-6 h-full w-full transition-all duration-700 ease-in-out ${
            code ? 'max-w-[1600px]' : 'max-w-[850px]'
          }`}
        >
          <div className="flex-1 h-full min-w-0">
            <ChatWindow />
          </div>

          <AnimatePresence>
            {code && (
              <motion.div 
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                className="flex-1 h-full min-w-0"
              >
                <CodePreview code={code} language="typescript" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}
