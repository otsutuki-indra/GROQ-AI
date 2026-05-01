interface Message {
  role: string;
  content: string;
}

export default function ChatWindow({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
      {messages.map((m, i) => (
        <div key={i} className={`text-sm ${m.role === 'user' ? 'text-white' : 'text-[#00FF41]'}`}>
          <div className="opacity-30 text-[10px] font-bold mb-1">
            {m.role === 'user' ? '>>> USER_PROMPT' : '>>> ARCHITECT_LOG'}
          </div>
          <p className="leading-relaxed border-l border-[#004411] pl-3">
            {m.role === 'assistant' ? "Code Generated (Check Console)" : m.content}
          </p>
        </div>
      ))}
    </div>
  );
}