'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useStore } from '../store/useStore'
import { Copy, Terminal } from 'lucide-react'

export default function CodePreview() {
  const { code, language } = useStore()
  if (!code) return null

  return (
    <div className="h-full flex flex-col bg-[#0d1117] border border-white/10 rounded-[24px] overflow-hidden shadow-2xl">
      <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-blue-400" />
          <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest">{language || 'code'}</span>
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(code)} 
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
        >
          <Copy size={14} className="text-white/50" />
        </button>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language || 'typescript'}
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '20px', background: 'transparent', fontSize: '13px', fontFamily: 'var(--font-mono)' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
