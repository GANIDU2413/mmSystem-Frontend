import { create } from "zustand";

const markTableStore = create((set) => ({
  currentFilter: null,
  setCurrentFilter: (currentFilter) => set({ currentFilter }),
}));

export default markTableStore;
