// store/useStore.js
import { create } from "zustand";

type Theme = "light" | "dark"

type store = {
    theme: Theme,
    setTheme: () => void
}

const useTheme = create<store>((set) => ({
  theme: "light",
  setTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

export default useTheme;
