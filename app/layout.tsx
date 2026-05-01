import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HELLX_CODER - Direct Expert Assistant',
  description: 'Sleek AI coding assistant with glassmorphic interface',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
