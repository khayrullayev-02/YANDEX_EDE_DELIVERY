"use client"
import { motion } from "framer-motion"
import { clsx } from "clsx"
import useThemeStore from "../stores/themeStore"

const NeonButton = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  ...props
}) => {
  const { getNeonColorClass, getNeonBorderClass } = useThemeStore()

  const variants = {
    primary: `bg-transparent border-2 ${getNeonBorderClass()} ${getNeonColorClass()} hover:bg-current hover:text-black`,
    secondary: "bg-dark-700 border-2 border-gray-500 text-white hover:border-white",
    ghost: `${getNeonColorClass()} hover:bg-current hover:text-black`,
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
    xl: "px-10 py-4 text-xl",
  }

  return (
    <motion.button
      type={type}
      className={clsx(
        "relative font-orbitron font-bold rounded-lg transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "overflow-hidden",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-current opacity-0 hover:opacity-20 transition-opacity duration-300" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        )}
        {children}
      </span>
    </motion.button>
  )
}

export default NeonButton
