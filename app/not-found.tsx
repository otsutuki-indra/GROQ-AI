import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="h-screen bg-black flex flex-col items-center justify-center font-mono text-[#00FF41] p-4 text-center">
      <div className="border border-[#004411] p-10 bg-[#020202] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF41] animate-pulse"></div>
        <h2 className="text-4xl font-black mb-4 tracking-tighter">ERROR_404</h2>
        <p className="opacity-50 mb-8 text-sm lowercase">
          [ ACCESS_DENIED: Requested coordinate does not exist in this sector. ]
        </p>
        <Link 
          href="/" 
          className="border border-[#00FF41] px-6 py-2 hover:bg-[#00FF41] hover:text-black transition-all font-bold text-xs"
        >
          RETURN_TO_BASE
        </Link>
      </div>
      <div className="mt-4 text-[10px] opacity-20 animate-pulse">
        HELLX_STUDIO_SECURITY_SYSTEM_ACTIVE
      </div>
    </main>
  );
}