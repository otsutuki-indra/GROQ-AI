'use client'

import { useEffect, useState } from 'react'
import { ChatWindow } from './components/ChatWindow'
import CodePreview from './components/CodePreview'
import { useStore } from './store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { code } = useStore()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between overflow-hidden px-6 py-10">
      
      {/* 1. Nebula Space Background (Reality CSS) */}
      <div className="fixed inset-0 z-[-1] bg-[#020408]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,18,36,0.8)_0%,#020408_100%)]" />
        {/* Animated Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* 2. Custom Cursor: ✦ */}
      <motion.div 
        className="fixed top-0 left-0 z-[9999] pointer-events-none text-white text-xl mix-blend-difference"
        animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      >
        ✦
      </motion.div>

      {/* 3. Header - From Demo Image */}
      <header className="z-10 text-center space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold tracking-[0.6em] text-red-600 flex items-center justify-center gap-3 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]"
        >
          H E L L X C O D E R <span className="text-2xl">🎯</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-green-400 font-mono text-xs md:text-sm tracking-[0.4em] uppercase"
        >
          START WRITE.ING
        </motion.p>
      </header>

      {/* 4. Main Workspace - Dynamic Centering */}
      <main className="z-10 flex-1 w-full flex justify-center items-center overflow-hidden my-8 px-4">
        <motion.div 
          layout
          className={`grid gap-8 h-full w-full transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${
            code ? 'max-w-[1700px] grid-cols-1 lg:grid-cols-2' : 'max-w-[850px] grid-cols-1'
          }`}
        >
          {/* Chat Section */}
          <div className="h-full min-w-0">
            <ChatWindow />
          </div>

          {/* Code Section (Animates in like Grok) */}
          <AnimatePresence>
            {code && (
              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full min-w-0"
              >
                <CodePreview />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* 5. Footer - From Demo Image */}
      <footer className="z-10 text-center space-y-2 select-none">
        <div className="flex flex-col items-center gap-1">
          <p className="text-white/40 font-light tracking-[0.3em] text-[10px] md:text-xs flex items-center gap-2">
            <span className="text-white/60">➜</span> made By HELLXSTUDIO.
          </p>
          <p className="text-red-700/80 text-[9px] md:text-[10px] tracking-widest uppercase font-bold">
            All rights reversed
          </p>
        </div>
      </footer>

      {/* Background Micro-Stars (Reality Effect) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

    </div>
  )
}
