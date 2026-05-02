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
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          Waiting for execution...
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col glass-lg rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex justify-between items-center">
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
          Output: {language || 'text'}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language || 'javascript'}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: '20px',
            background: 'transparent',
            fontSize: '12px',
            lineHeight: '1.6',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
