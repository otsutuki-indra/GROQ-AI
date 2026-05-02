import { create } from 'zustand'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatStore {
  messages: Message[]
  code: string
  language: string
  addMessage: (message: Message) => void
  setCode: (code: string, language: string) => void
}

export const useStore = create<ChatStore>((set) => ({
  messages: [{ role: 'assistant', content: 'SYSTEM_READY: HELLX_CODER active.' }],
  code: '',
  language: 'typescript',
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setCode: (code, language) => set({ code, language }),
}))
