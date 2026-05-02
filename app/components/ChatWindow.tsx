
'use client'
import { useState } from 'react'
import { useStore } from '../store/useStore'
import { motion } from 'framer-motion'

export default function ChatWindow() {
  const [input,setInput]=useState("")
  const {messages,addMessage,setCode}=useStore()

  const send = async () => {
    if(!input) return
    addMessage({role:"user",content:input})
    const res = await fetch('/api/chat',{method:'POST',body:JSON.stringify({message:input})})
    const data = await res.json()
    addMessage({role:"ai",content:data.reply})
    if(data.code) setCode(data.code)
    setInput("")
  }

  return (
    <div className="w-1/2 glass rounded-xl p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m:any,i:number)=>(
          <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}}>
            <p className={m.role==="user"?"text-emerald-400":"text-zinc-300"}>
              {m.content}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 bg-transparent border border-zinc-700 rounded px-2"
          value={input}
          onChange={e=>setInput(e.target.value)}
        />
        <button onClick={send} className="bg-emerald-600 px-3 rounded">Send</button>
      </div>
    </div>
  )
}
