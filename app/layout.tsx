'use client'
import './globals.css'
import { useEffect, useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <html lang="en">
      <body>
        <div className="custom-cursor" style={{ left: pos.x, top: pos.y }}>✦</div>
        <div className="nebula-bg" />
        {children}
      </body>
    </html>
  )
}
