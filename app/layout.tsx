'use client'

import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased h-screen w-screen flex items-center justify-center overflow-hidden">
        {isMounted && (
          <div 
            className="fixed pointer-events-none z-[9999] text-white text-xl mix-blend-difference"
            style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
          >
            ✦
          </div>
        )}
        {children}
      </body>
    </html>
  )
}
