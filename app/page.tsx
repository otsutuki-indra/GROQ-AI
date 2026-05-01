"use client";
import { useState } from 'react';
// Path fix: Assuming components folder is in the root
import ChatWindow from '../components/ChatWindow';
import CodePreview from '../components/CodePreview';

export default function MainApp() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [currentCode, setCurrentCode] = useState<string>('// Your code will appear here...');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (data.content) {
        setMessages([...newMessages, { role: 'assistant', content: data.content }]);
        
        // Simple regex to extract code blocks if present
        const codeMatch = data.content.match(/```(?:[\w]*)\n([\s\S]*?)```/);
        if (codeMatch) {
          setCurrentCode(codeMatch[1]);
        }
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen bg-black text-green-500 font-mono p-4 gap-4">
      {/* Left Side: Chat Interface */}
      <div className="w-1/3 border border-green-900 rounded-lg flex flex-col overflow-hidden">
        <div className="p-3 border-b border-green-900 bg-zinc-950 font-bold">
          HELLX_CODER_TERMINAL v1.0
        </div>
        <ChatWindow messages={messages} isLoading={isLoading} />
        <div className="p-4 border-t border-green-900 bg-zinc-950 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your command..."
            className="flex-1 bg-black border border-green-800 p-2 outline-none focus:border-green-400 transition-colors"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-green-900 hover:bg-green-700 text-black font-bold px-4 py-2 transition-colors"
          >
            EXECUTE
          </button>
        </div>
      </div>

      {/* Right Side: Code Preview */}
      <div className="w-2/3 border border-green-900 rounded-lg overflow-hidden flex flex-col bg-zinc-950">
        <div className="p-3 border-b border-green-900 flex justify-between items-center">
          <span className="font-bold">LIVE_PREVIEW_WINDOW</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-900"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-900"></div>
            <div className="w-3 h-3 rounded-full bg-green-900"></div>
          </div>
        </div>
        <div className="flex-1 p-0 overflow-auto">
          <CodePreview code={currentCode} />
        </div>
      </div>
    </main>
  );
}
