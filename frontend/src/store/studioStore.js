import { create } from 'zustand'

export const useStudioStore = create((set) => ({
  currentDesign: null,
  isGenerating: false,
  prompt: '',
  selectedStyles: [],
  generationHistory: [],

  setPrompt: (prompt) => set({ prompt }),

  toggleStyle: (style) =>
    set((state) => ({
      selectedStyles: state.selectedStyles.includes(style)
        ? state.selectedStyles.filter((s) => s !== style)
        : [...state.selectedStyles, style],
    })),

  setGenerating: (isGenerating) => set({ isGenerating }),

  setDesign: (design) =>
    set((state) => ({
      currentDesign: design,
      generationHistory: [design, ...state.generationHistory.slice(0, 9)],
    })),

  clearDesign: () => set({ currentDesign: null }),

  reset: () =>
    set({
      currentDesign: null,
      isGenerating: false,
      prompt: '',
      selectedStyles: [],
    }),
}))
