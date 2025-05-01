import { create } from "zustand";

export const useAlertStore = create((set) => ({
  isOpen: false,
  message: "",
  openAlert: (message) => set({ isOpen: true, message }),
  closeAlert: () => set({ isOpen: false, message: "" }),
}));
