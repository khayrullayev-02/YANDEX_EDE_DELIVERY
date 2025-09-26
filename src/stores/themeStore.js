import { create } from "zustand"
import { persist } from "zustand/middleware"

const useThemeStore = create(
  persist(
    (set, get) => ({
      isDarkMode: true,
      language: "en",
      neonColor: "blue",

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      setLanguage: (language) => set({ language }),

      setNeonColor: (color) => set({ neonColor: color }),

      getNeonColorClass: () => {
        const { neonColor } = get()
        const colorMap = {
          blue: "text-neon-blue",
          purple: "text-neon-purple",
          pink: "text-neon-pink",
          green: "text-neon-green",
          yellow: "text-neon-yellow",
          orange: "text-neon-orange",
        }
        return colorMap[neonColor] || colorMap.blue
      },

      getNeonBorderClass: () => {
        const { neonColor } = get()
        const borderMap = {
          blue: "border-neon-blue shadow-neon-blue",
          purple: "border-neon-purple shadow-neon-purple",
          pink: "border-neon-pink shadow-neon-pink",
          green: "border-neon-green shadow-neon-green",
          yellow: "border-neon-yellow shadow-neon-yellow",
          orange: "border-neon-orange shadow-neon-orange",
        }
        return borderMap[neonColor] || borderMap.blue
      },
    }),
    {
      name: "theme-storage",
    },
  ),
)

export default useThemeStore
