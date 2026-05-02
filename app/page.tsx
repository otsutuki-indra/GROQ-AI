'use client'

import { ChatWindow } from './components/ChatWindow'
import CodePreview from './components/CodePreview'
import { useStore } from './store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { code } = useStore()

  return (
    <div className="relative flex flex-col h-screen overflow-hidden font-sans">
      {/* Grok-style Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grok-glow top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full animate-pulse" />
        <div className="grok-glow bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Centered Workspace */}
      <main className="relative z-10 flex-1 flex justify-center items-center p-4 md:p-8">
        <motion.div 
          layout
          className={`flex gap-6 h-full w-full transition-all duration-500 ${
            code ? 'max-w-[1600px]' : 'max-w-[900px]'
          }`}
        >
          {/* Chat Panel */}
          <div className="flex-1 h-full min-w-0">
            <ChatWindow />
          </div>

          {/* Code Preview Panel (Grok Animation) */}
          <AnimatePresence>
            {code && (
              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
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
