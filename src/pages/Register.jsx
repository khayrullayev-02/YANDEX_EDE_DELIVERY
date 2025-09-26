"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, ArrowRight } from "lucide-react"
import { toast } from "react-hot-toast"
import useAuthStore from "../stores/authStore"
import useThemeStore from "../stores/themeStore"
import NeonButton from "../components/NeonButton"
import LoadingSpinner from "../components/LoadingSpinner"
import ParticleBackground from "../components/ParticleBackground"

const Register = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register, loading } = useAuthStore()
  const { getNeonColorClass, isDarkMode } = useThemeStore()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    userType: "customer", // customer, restaurant, courier
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const userTypes = [
    { value: "customer", label: "Customer", description: "Order food from restaurants" },
    { value: "restaurant", label: "Restaurant Owner", description: "Manage your restaurant and menu" },
    { value: "courier", label: "Delivery Courier", description: "Deliver orders and earn money" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep2()) return

    const result = await register(formData)

    if (result.success) {
      toast.success("Registration successful!")
      navigate("/")
    } else {
      toast.error(result.error || "Registration failed")
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 ${isDarkMode ? "bg-dark-900" : "bg-gray-50"}`}
    >
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
            {t("signUp")}
          </motion.h1>
          <p className={`mt-2 font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Join NeonFood today</p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${step >= 1 ? getNeonColorClass() + " bg-current" : "bg-gray-400"} transition-all duration-300`}
            />
            <div
              className={`w-8 h-1 ${step >= 2 ? getNeonColorClass() + " bg-current" : "bg-gray-400"} transition-all duration-300`}
            />
            <div
              className={`w-3 h-3 rounded-full ${step >= 2 ? getNeonColorClass() + " bg-current" : "bg-gray-400"} transition-all duration-300`}
            />
          </div>
        </div>

        {/* User Type Selection */}
        {step === 0 && (
          <div className="px-8 pb-8 space-y-4">
            <h2
              className={`text-lg font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} text-center mb-6`}
            >
              Choose Your Role
            </h2>
            {userTypes.map((type) => (
              <motion.button
                key={type.value}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, userType: type.value }))
                  setStep(1)
                }}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                  formData.userType === type.value
                    ? `${getNeonColorClass()} border-current bg-current/10`
                    : isDarkMode
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-gray-300 hover:border-gray-400"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {type.label}
                </h3>
                <p className={`text-sm font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                  {type.description}
                </p>
              </motion.button>
            ))}
          </div>
        )}

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="px-8 pb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <label
                  className={`block text-sm font-rajdhani font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
                >
                  {t("firstName")}
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getNeonColorClass()} w-4 h-4`}
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors.firstName
                        ? "border-red-500"
                        : isDarkMode
                          ? "border-gray-600 bg-dark-700 text-white"
                          : "border-gray-300 bg-white text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-current ${getNeonColorClass()} font-rajdhani transition-all duration-300`}
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-xs mt-1 font-rajdhani">{errors.firstName}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <label
                  className={`block text-sm font-rajdhani font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
                >
                  {t("lastName")}
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getNeonColorClass()} w-4 h-4`}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors.lastName
                        ? "border-red-500"
                        : isDarkMode
                          ? "border-gray-600 bg-dark-700 text-white"
                          : "border-gray-300 bg-white text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-current ${getNeonColorClass()} font-rajdhani transition-all duration-300`}
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-xs mt-1 font-rajdhani">{errors.lastName}</p>}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
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
              {errors.email && <p className="text-red-500 text-sm mt-1 font-rajdhani">{errors.email}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <label
                className={`block text-sm font-rajdhani font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
              >
                {t("phone")}
              </label>
              <div className="relative">
                <Phone
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getNeonColorClass()} w-5 h-5`}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                    errors.phone
                      ? "border-red-500"
                      : isDarkMode
                        ? "border-gray-600 bg-dark-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-current ${getNeonColorClass()} font-rajdhani transition-all duration-300`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1 font-rajdhani">{errors.phone}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <NeonButton type="button" variant="primary" size="lg" className="w-full" onClick={handleNext}>
                Next Step
                <ArrowRight size={20} />
              </NeonButton>
            </motion.div>
          </div>
        )}

        {/* Step 2: Password & Address */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label
                className={`block text-sm font-rajdhani font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
              >
                {t("address")}
              </label>
              <div className="relative">
                <MapPin className={`absolute left-3 top-3 ${getNeonColorClass()} w-5 h-5`} />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                    errors.address
                      ? "border-red-500"
                      : isDarkMode
                        ? "border-gray-600 bg-dark-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-current ${getNeonColorClass()} font-rajdhani transition-all duration-300 resize-none`}
                  placeholder="Enter your address"
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm mt-1 font-rajdhani">{errors.address}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
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
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 font-rajdhani">{errors.password}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <label
                className={`block text-sm font-rajdhani font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
              >
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getNeonColorClass()} w-5 h-5`} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : isDarkMode
                        ? "border-gray-600 bg-dark-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-current ${getNeonColorClass()} font-rajdhani transition-all duration-300`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300`}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 font-rajdhani">{errors.confirmPassword}</p>
              )}
            </motion.div>

            <div className="flex space-x-4">
              <NeonButton type="button" variant="secondary" size="lg" className="flex-1" onClick={handleBack}>
                Back
              </NeonButton>
              <NeonButton
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={loading}
                loading={loading}
              >
                {loading ? (
                  <LoadingSpinner size="sm" text="" />
                ) : (
                  <>
                    {t("signUp")}
                    <ArrowRight size={20} />
                  </>
                )}
              </NeonButton>
            </div>
          </form>
        )}

        {/* Login Link */}
        <motion.div
          className="px-8 pb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Already have an account?{" "}
            <Link
              to="/login"
              className={`${getNeonColorClass()} hover:underline font-medium transition-all duration-300`}
            >
              {t("signIn")}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Register
