'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Code2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CodePreviewProps {
  code: string
  language: string
}

export function CodePreview({ code, language }: CodePreviewProps) {
  const [copied, setCopied] = useState(false)
  const [displayCode, setDisplayCode] = useState(code)

  useEffect(() => {
    setDisplayCode(code)
  }, [code])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const languageLabels: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    jsx: 'JSX',
    tsx: 'TSX',
    html: 'HTML',
    css: 'CSS',
    bash: 'Bash',
    sql: 'SQL',
    json: 'JSON',
    markdown: 'Markdown',
  }

  return (
    <div className="glass-lg h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">Output</h2>
          <span className="text-[10px] px-2 py-1 rounded glass text-emerald-400/80 font-mono">
            {languageLabels[language] || language}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          disabled={!displayCode}
          className="glass px-3 py-2 rounded-lg hover:bg-emerald-400/10 hover:border-emerald-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-4 h-4 text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Copy className="w-4 h-4 text-white/60 hover:text-emerald-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {displayCode ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-auto"
          >
            <pre className="h-full px-6 py-4 text-xs font-mono text-white/80 whitespace-pre-wrap break-words leading-relaxed">
              <code>{displayCode}</code>
            </pre>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
              <Code2 className="w-6 h-6 text-emerald-400/40" />
            </div>
            <div className="text-center">
              <p className="text-sm text-white/40 font-mono">No code yet</p>
              <p className="text-xs text-white/20 mt-1">Ask me to generate code...</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Info */}
      {displayCode && (
        <div className="border-t border-white/10 px-6 py-3 flex justify-between items-center text-xs text-white/40 font-mono">
          <span>{displayCode.split('\n').length} lines</span>
          <span>{displayCode.length} chars</span>
        </div>
      )}
    </div>
  )
}
