'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodePreviewProps {
  code: string
  language: string
}

export default function CodePreview({ code, language }: CodePreviewProps) {
  if (!code) {
    return (
      <div className="h-full flex items-center justify-center glass-lg rounded-2xl border border-white/10 bg-white/5">
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
          Waiting for execution...
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col glass-lg rounded-2xl border border-white/10 bg-white/5 overflow-hidden animate-in fade-in duration-500">
      <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            {language || 'system'}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language || 'javascript'}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: '24px',
            background: 'transparent',
            fontSize: '13px',
            lineHeight: '1.7',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
