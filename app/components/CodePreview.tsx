
'use client'
import { useEffect } from 'react'
import Prism from 'prismjs'
import { useStore } from '../store/useStore'

export default function CodePreview(){
  const {code}=useStore()

  useEffect(()=>{Prism.highlightAll()},[code])

  return (
    <div className="w-1/2 glass rounded-xl p-4 overflow-auto">
      <pre className="language-js">
        <code>{code || "// waiting for code..."}</code>
      </pre>
    </div>
  )
}
