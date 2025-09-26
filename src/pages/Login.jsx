"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { toast } from "react-hot-toast"
import useAuthStore from "../stores/authStore"
import useThemeStore from "../stores/themeStore"
import NeonButton from "../components/NeonButton"
import LoadingSpinner from "../components/LoadingSpinner"
import ParticleBackground from "../components/ParticleBackground"

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, loading } = useAuthStore()
  const { getNeonColorClass, isDarkMode } = useThemeStore()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const result = await login(formData)

    if (result.success) {
      toast.success("Login successful!")
      navigate("/")
    } else {
      toast.error(result.error || "Login failed")
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDarkMode ? "bg-dark-900" : "bg-gray-50"}`}>
      <ParticleBackground particleCount={30} />

      <motion.div
        className={`w-full max-w-md ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md rounded-2xl shadow-2xl border ${isDarkMode ? "border-gray-700" : "border-gray-200"} overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <motion.h1
            className={`text-3xl font-orbitron font-bold ${getNeonColorClass()}`}
            style={{ textShadow: "0 0 20px currentColor" }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {t("signIn")}
          </motion.h1>
          <p className={`mt-2 font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Welcome back to NeonFood
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Email Field */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label
              className={`block text-sm font-rajdhani font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
            >
              {t("email")}
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getNeonColorClass()} w-5 h-5`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                  errors.email
                    ? "border-red-500"
                    : isDarkMode
                      ? "border-gray-600 bg-dark-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-current ${getNeonColorClass()} font-rajdhani transition-all duration-300`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <motion.p
                className="text-red-500 text-sm mt-1 font-rajdhani"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label
              className={`block text-sm font-rajdhani font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
            >
              {t("password")}
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getNeonColorClass()} w-5 h-5`} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                  errors.password
                    ? "border-red-500"
                    : isDarkMode
                      ? "border-gray-600 bg-dark-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-current ${getNeonColorClass()} font-rajdhani transition-all duration-300`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <motion.p
                className="text-red-500 text-sm mt-1 font-rajdhani"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className={`text-sm font-rajdhani ${getNeonColorClass()} hover:underline transition-all duration-300`}
            >
              {t("forgotPassword")}
            </Link>
          </div>

          {/* Submit Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <NeonButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
              loading={loading}
            >
              {loading ? (
                <LoadingSpinner size="sm" text="" />
              ) : (
                <>
                  {t("signIn")}
                  <ArrowRight size={20} />
                </>
              )}
            </NeonButton>
          </motion.div>

          {/* Register Link */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className={`${getNeonColorClass()} hover:underline font-medium transition-all duration-300`}
              >
                {t("signUp")}
              </Link>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
