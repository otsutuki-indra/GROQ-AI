'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Code2, Hash } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodePreviewProps {
  code: string
  language: string
}

export function CodePreview({ code, language }: CodePreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const languageLabels: Record<string, string> = {
    javascript: 'JS',
    typescript: 'TS',
    python: 'Python',
    jsx: 'JSX',
    tsx: 'TSX',
    html: 'HTML',
    css: 'CSS',
    bash: 'Bash',
    sql: 'SQL',
    json: 'JSON',
  }

  return (
    <div className="glass-lg h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Code2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Source_Viewer</h2>
            <p className="text-[10px] text-emerald-400/60 font-mono">
              {languageLabels[language] || language || 'Plain Text'}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          disabled={!code}
          className="glass p-2 rounded-lg border border-white/10 hover:border-emerald-500/50 transition-all disabled:opacity-20"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
                <Check className="w-4 h-4 text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
                <Copy className="w-4 h-4 text-white/60" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-black/40">
        {code ? (
          <SyntaxHighlighter
            language={language.toLowerCase()}
            style={atomDark}
            customStyle={{
              margin: 0,
              padding: '24px',
              fontSize: '12px',
              lineHeight: '1.6',
              background: 'transparent',
              fontFamily: 'var(--font-mono)',
            }}
            showLineNumbers={true}
            lineNumberStyle={{ minWidth: '3em', paddingRight: '1em', color: '#312e81', textAlign: 'right' }}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
            <Hash className="w-12 h-12 mb-4 text-emerald-400" />
            <p className="text-xs font-mono uppercase tracking-widest text-white">No Input Detected</p>
          </div>
        )}
      </div>

      {/* Footer Meta */}
      {code && (
        <div className="border-t border-white/10 px-6 py-2 bg-white/5 flex justify-between items-center text-[10px] text-white/30 font-mono">
          <div className="flex gap-4">
            <span>LINES: {code.split('\n').length}</span>
            <span>SIZE: {new Blob([code]).size} B</span>
          </div>
          <span className="text-emerald-400/40 animate-pulse">READY</span>
        </div>
      )}
    </div>
  )
}
