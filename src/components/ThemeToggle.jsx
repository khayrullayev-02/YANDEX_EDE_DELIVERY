"use client"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import useThemeStore from "../stores/themeStore"

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode, getNeonColorClass } = useThemeStore()

  return (
    <motion.button
      className={`relative w-14 h-8 rounded-full border-2 border-current ${getNeonColorClass()} bg-dark-800/50 p-1 transition-all duration-300`}
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-5 h-5 rounded-full bg-current flex items-center justify-center`}
        animate={{
          x: isDarkMode ? 0 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDarkMode ? <Moon size={12} className="text-dark-900" /> : <Sun size={12} className="text-dark-900" />}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
