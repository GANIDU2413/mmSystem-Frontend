import { create } from "zustand";

const hodMarksStore = create((set) => ({
  level: 0,
  sem: 0,
  studentId: "",
  courseCode: "",

  setLevel: (level) => set({ level }),
  setSem: (sem) => set({ sem }),
  setStudentId: (studentId) => set({ studentId }),
  setCourseCode: (courseCode) => set({ courseCode }),
}));

export default hodMarksStore;
