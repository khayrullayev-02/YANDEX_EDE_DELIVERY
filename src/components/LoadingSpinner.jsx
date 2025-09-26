"use client"
import { motion } from "framer-motion"
import useThemeStore from "../stores/themeStore"

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const { getNeonColorClass } = useThemeStore()

  const sizes = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizes[size]} border-4 border-transparent border-t-current rounded-full ${getNeonColorClass()}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          filter: "drop-shadow(0 0 10px currentColor)",
        }}
      />
      {text && (
        <motion.p
          className={`text-sm font-rajdhani ${getNeonColorClass()}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export default LoadingSpinner
