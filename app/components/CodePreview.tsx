'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodePreview({ code, language }: any) {
  return (
    <div className="h-full flex flex-col glass-panel rounded-[32px] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{language}</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language || 'javascript'}
          style={atomDark}
          customStyle={{ margin: 0, padding: '30px', background: 'transparent', fontSize: '13px' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
