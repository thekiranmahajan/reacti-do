import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("currentTheme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("currentTheme", theme);
    set({ theme });
  },
}));

export default useThemeStore;
