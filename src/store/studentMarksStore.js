import { create } from "zustand";

const studentMarksStore = create((set) => ({
  level: 0,
  sem: 0,

  setLevel: (level) => set({ level }),
  setSem: (sem) => set({ sem }),
}));

export default studentMarksStore;
