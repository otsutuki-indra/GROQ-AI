
import ChatWindow from "./components/ChatWindow"
import CodePreview from "./components/CodePreview"

export default function Home() {
  return (
    <main className="flex h-screen gap-4 p-4">
      <ChatWindow />
      <CodePreview />
    </main>
  )
}
