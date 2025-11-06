import { create } from 'zustand'

export const useChatStore = create((set) => ({
  messages: [],
  sendMessage: (text, sender) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {time: Date.now(), text, sender},
      ],
    }))
  },
}));