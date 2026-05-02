import { create } from 'zustand'

export type Message = {
  role: 'user' | 'assistant';
  content: string;
}

interface StoreState {
  messages: Message[];
  code: string;
  language: string;
  addMessage: (msg: Message) => void;
  setCode: (code: string, lang: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  messages: [],
  code: '',
  language: '',
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setCode: (code, language) => set({ code, language }),
}))
