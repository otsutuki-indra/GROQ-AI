
import { create } from 'zustand'

export const useStore = create((set) => ({
  messages: [],
  code: "",
  addMessage: (m:any) => set((s:any)=>({messages:[...s.messages,m]})),
  setCode: (c:string)=>set({code:c})
}))
