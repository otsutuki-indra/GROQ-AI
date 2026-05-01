"use client";
import { useState } from 'react';
import ChatWindow from '@/components/ChatWindow';
import CodePreview from '@/components/CodePreview';

export default function MainApp() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [currentCode, setCurrentCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, data]);
      
      // Extract code block if present
      const codeMatch = data.content.match(/```(?:tsx|jsx|html)?([\s\S]*?)```/);
      if (codeMatch) setCurrentCode(codeMatch[1].trim());
      else setCurrentCode(data.content);

    } catch (err) {
      console.error("Link Failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen bg-black text-[#00FF41] font-mono">
      {/* Sidebar: Control Terminal */}
      <div className="w-1/3 border-r border-[#004411] flex flex-col bg-[#020202]">
        <div className="p-4 border-b border-[#004411] font-black text-lg tracking-widest">
          HELLX_CODER
        </div>
        <ChatWindow messages={messages} />
        <div className="p-4 bg-black border-t border-[#004411]">
          <div className="flex gap-2">
            <input 
              className="flex-1 bg-[#0A0A0A] border border-[#004411] p-2 focus:outline-none focus:border-[#00FF41] text-white text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
              placeholder="ENTER COMMAND..."
            />
            <button 
              onClick={handleExecute}
              className="bg-[#00FF41] text-black px-4 font-bold text-xs hover:bg-white"
            >
              {loading ? "..." : "EXE"}
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Code Console */}
      <div className="w-2/3 bg-black">
        <CodePreview code={currentCode} />
      </div>
    </main>
  );
}