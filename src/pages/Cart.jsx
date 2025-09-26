"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react"
import { toast } from "react-hot-toast"
import useCartStore from "../stores/cartStore"
import useThemeStore from "../stores/themeStore"
import useAuthStore from "../stores/authStore"
import NeonButton from "../components/NeonButton"
import ParticleBackground from "../components/ParticleBackground"

const Cart = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, total, deliveryFee, updateQuantity, removeItem, clearCart, getTotalWithDelivery } = useCartStore()
  const { getNeonColorClass, isDarkMode } = useThemeStore()
  const { isAuthenticated } = useAuthStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to continue")
      navigate("/login")
      return
    }

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully!")
      clearCart()
      navigate("/orders")
      setIsCheckingOut(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className={`min-h-screen pt-20 ${isDarkMode ? "bg-dark-900" : "bg-gray-50"}`}>
        <ParticleBackground particleCount={20} />

        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className={`${getNeonColorClass()} w-24 h-24 mx-auto mb-6`} />
            <h1 className={`text-3xl font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
              Your cart is empty
            </h1>
            <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-8 text-lg`}>
              Looks like you haven't added any items to your cart yet
            </p>
            <Link to="/restaurants">
              <NeonButton variant="primary" size="lg">
                Browse Restaurants
              </NeonButton>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? "bg-dark-900" : "bg-gray-50"}`}>
      <ParticleBackground particleCount={30} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <Link to="/">
              <motion.button
                className={`p-2 rounded-lg ${getNeonColorClass()} hover:bg-current/10 transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={24} />
              </motion.button>
            </Link>
            <h1 className={`text-3xl font-orbitron font-bold ${getNeonColorClass()}`}>Your Cart</h1>
          </div>

          <motion.button
            onClick={clearCart}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 size={18} />
            <span className="font-rajdhani">Clear Cart</span>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3
                        className={`text-lg font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}
                      >
                        {item.name}
                      </h3>
                      <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-2`}>
                        {item.restaurant}
                      </p>
                      <p className={`text-xl font-orbitron font-bold ${getNeonColorClass()}`}>${item.price}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={`w-8 h-8 rounded-full border-2 ${getNeonColorClass()} border-current flex items-center justify-center hover:bg-current hover:text-black transition-all duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={16} />
                        </motion.button>

                        <span
                          className={`w-8 text-center font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {item.quantity}
                        </span>

                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={`w-8 h-8 rounded-full border-2 ${getNeonColorClass()} border-current flex items-center justify-center hover:bg-current hover:text-black transition-all duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"} sticky top-24`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className={`text-xl font-orbitron font-bold ${getNeonColorClass()} mb-6`}>Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Subtotal</span>
                  <span className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {t("deliveryFee")}
                  </span>
                  <span className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between">
                    <span className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} text-lg`}>
                      {t("totalPrice")}
                    </span>
                    <span className={`font-orbitron font-bold ${getNeonColorClass()} text-xl`}>
                      ${getTotalWithDelivery().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <NeonButton
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                loading={isCheckingOut}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard size={20} />
                    {t("checkout")}
                  </>
                )}
              </NeonButton>

              {!isAuthenticated && (
                <p
                  className={`text-sm font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-center mt-4`}
                >
                  Please{" "}
                  <Link to="/login" className={`${getNeonColorClass()} hover:underline`}>
                    login
                  </Link>{" "}
                  to continue with checkout
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
