export default function CodePreview({ code }: { code: string }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0A0A0A] border-b border-[#004411] text-[10px] text-[#00FF41] opacity-50">
        <span>RAW_SOURCE_VIEWER</span>
        <span>STATUS: ACTIVE</span>
      </div>
      <div className="flex-1 p-6 overflow-auto bg-black">
        <pre className="text-sm text-green-200 font-mono whitespace-pre-wrap">
          <code>{code || "// WAITING FOR ARCHITECTURAL INPUT..."}</code>
        </pre>
      </div>
    </div>
  );
}