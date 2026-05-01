interface Message {
  role: string;
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] p-2 rounded font-mono text-sm ${
            msg.role === 'user' 
            ? 'bg-green-900 text-black' 
            : 'bg-zinc-900 text-green-400 border border-green-900'
          }`}>
            <pre className="whitespace-pre-wrap">{msg.content}</pre>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="text-green-500 animate-pulse text-xs font-mono">
          &gt; HELLX_CODER_SYSTEM: PROCESSING_REQUEST...
        </div>
      )}
    </div>
  );
}
