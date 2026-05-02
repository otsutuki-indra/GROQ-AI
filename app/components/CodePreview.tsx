'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useStore } from '../store/useStore'
import { Copy, Terminal, Check } from 'lucide-react'
import { useState } from 'react'

export default function CodePreview() {
  const { code, language } = useStore()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!code) return null

  return (
    <div className="h-full flex flex-col glass-window overflow-hidden border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-500">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-orange-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex items-center gap-2 ml-4 text-[11px] font-mono text-white/40 tracking-widest uppercase">
            <Terminal size={12} />
            <span>{language || 'typescript'} — HELLX_COMPILER</span>
          </div>
        </div>
        
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-white/60" />}
          <span className="text-[10px] text-white/60 uppercase font-bold tracking-tighter">
            {copied ? 'Copied' : 'Copy'}
          </span>
        </button>
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-black/20">
        <SyntaxHighlighter
          language={language || 'typescript'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '24px',
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-mono)',
          }}
          showLineNumbers={true}
          lineNumberStyle={{ minWidth: '3em', paddingRight: '1em', color: 'rgba(255,255,255,0.1)', textAlign: 'right' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
