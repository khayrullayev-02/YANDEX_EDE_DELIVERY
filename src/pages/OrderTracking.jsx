"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useParams, Link } from "react-router-dom"
import { MapPin, Phone, MessageCircle, CheckCircle, Package, Truck, Home, Star, ArrowLeft } from "lucide-react"
import useThemeStore from "../stores/themeStore"
import NeonButton from "../components/NeonButton"
import ParticleBackground from "../components/ParticleBackground"

const OrderTracking = () => {
  const { t } = useTranslation()
  const { orderId } = useParams()
  const { getNeonColorClass, isDarkMode } = useThemeStore()
  const [currentStep, setCurrentStep] = useState(2)
  const [estimatedTime, setEstimatedTime] = useState(25)

  // Mock order data
  const order = {
    id: orderId || "#ORD-001",
    restaurant: {
      name: "Neon Pizza Palace",
      image: "/futuristic-pizza-restaurant.jpg",
      phone: "+998 90 123 45 67",
      address: "123 Cyber Street, Tashkent",
    },
    courier: {
      name: "Alex Johnson",
      phone: "+998 90 987 65 43",
      rating: 4.9,
      vehicle: "Electric Bike",
      image: "/placeholder-user.jpg",
    },
    items: [
      { name: "Neon Margherita Pizza", quantity: 1, price: 18.99 },
      { name: "Cyber Cola", quantity: 2, price: 3.99 },
    ],
    total: 26.97,
    deliveryFee: 2.99,
    finalTotal: 29.96,
    deliveryAddress: "456 Future Avenue, Apt 12B, Tashkent",
    orderTime: "2025-01-09T18:30:00Z",
    estimatedDelivery: "2025-01-09T19:15:00Z",
  }

  const trackingSteps = [
    {
      id: 1,
      title: "Order Confirmed",
      description: "Restaurant received your order",
      icon: CheckCircle,
      time: "18:30",
      completed: true,
    },
    {
      id: 2,
      title: "Preparing Food",
      description: "Your delicious meal is being prepared",
      icon: Package,
      time: "18:35",
      completed: true,
    },
    {
      id: 3,
      title: "Out for Delivery",
      description: "Courier picked up your order",
      icon: Truck,
      time: "18:50",
      completed: currentStep >= 3,
    },
    {
      id: 4,
      title: "Delivered",
      description: "Enjoy your meal!",
      icon: Home,
      time: "19:15",
      completed: currentStep >= 4,
    },
  ]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1))

      // Simulate progression
      if (estimatedTime <= 15 && currentStep < 3) {
        setCurrentStep(3)
      }
      if (estimatedTime <= 5 && currentStep < 4) {
        setCurrentStep(4)
      }
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [estimatedTime, currentStep])

  const formatTime = (minutes) => {
    if (minutes <= 0) return "Delivered!"
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
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
            <Link to="/orders">
              <motion.button
                className={`p-2 rounded-lg ${getNeonColorClass()} hover:bg-current/10 transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={24} />
              </motion.button>
            </Link>
            <div>
              <h1 className={`text-3xl font-orbitron font-bold ${getNeonColorClass()}`}>Track Order</h1>
              <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Order {order.id}</p>
            </div>
          </div>

          <div className="text-right">
            <p className={`text-2xl font-orbitron font-bold ${getNeonColorClass()}`}>{formatTime(estimatedTime)}</p>
            <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Estimated delivery</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Map Placeholder */}
            <motion.div
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"} h-64 flex items-center justify-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-center">
                <MapPin className={`${getNeonColorClass()} w-16 h-16 mx-auto mb-4`} />
                <h3 className={`text-xl font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
                  Live Tracking
                </h3>
                <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Your courier is on the way!
                </p>
              </div>
            </motion.div>

            {/* Tracking Steps */}
            <motion.div
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={`text-xl font-orbitron font-bold ${getNeonColorClass()} mb-6`}>Order Progress</h3>

              <div className="space-y-6">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = step.completed

                  return (
                    <motion.div
                      key={step.id}
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="relative">
                        <motion.div
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                            isCompleted
                              ? `${getNeonColorClass()} border-current bg-current/10`
                              : isDarkMode
                                ? "border-gray-600 text-gray-600"
                                : "border-gray-300 text-gray-400"
                          }`}
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
                        >
                          <Icon size={20} />
                        </motion.div>
                        {index < trackingSteps.length - 1 && (
                          <div
                            className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 ${
                              isCompleted ? getNeonColorClass() + " bg-current" : "bg-gray-600"
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-orbitron font-bold ${
                              isCompleted
                                ? isDarkMode
                                  ? "text-white"
                                  : "text-gray-900"
                                : isDarkMode
                                  ? "text-gray-400"
                                  : "text-gray-600"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span
                            className={`text-sm font-rajdhani ${
                              isCompleted ? getNeonColorClass() : isDarkMode ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            {step.time}
                          </span>
                        </div>
                        <p
                          className={`font-rajdhani ${
                            isCompleted
                              ? isDarkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                              : isDarkMode
                                ? "text-gray-500"
                                : "text-gray-500"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Courier Info */}
            <motion.div
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className={`text-lg font-orbitron font-bold ${getNeonColorClass()} mb-4`}>Your Courier</h3>

              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={order.courier.image || "/placeholder.svg"}
                  alt={order.courier.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-current"
                />
                <div>
                  <h4 className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {order.courier.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 w-4 h-4 fill-current" />
                    <span className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {order.courier.rating}
                    </span>
                  </div>
                  <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
                    {order.courier.vehicle}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <NeonButton variant="primary" size="sm" className="flex-1">
                  <Phone size={16} />
                  Call
                </NeonButton>
                <NeonButton variant="ghost" size="sm" className="flex-1">
                  <MessageCircle size={16} />
                  Chat
                </NeonButton>
              </div>
            </motion.div>

            {/* Restaurant Info */}
            <motion.div
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className={`text-lg font-orbitron font-bold ${getNeonColorClass()} mb-4`}>Restaurant</h3>

              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={order.restaurant.image || "/placeholder.svg"}
                  alt={order.restaurant.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {order.restaurant.name}
                  </h4>
                  <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
                    {order.restaurant.address}
                  </p>
                </div>
              </div>

              <NeonButton variant="ghost" size="sm" className="w-full">
                <Phone size={16} />
                Call Restaurant
              </NeonButton>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className={`text-lg font-orbitron font-bold ${getNeonColorClass()} mb-4`}>Order Summary</h3>

              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {item.quantity}x {item.name}
                    </span>
                    <span className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-600 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Subtotal</span>
                  <span className={`font-orbitron ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Delivery Fee
                  </span>
                  <span className={`font-orbitron ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    ${order.deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-600">
                  <span className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Total
                  </span>
                  <span className={`font-orbitron font-bold ${getNeonColorClass()} text-lg`}>
                    ${order.finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Delivery Address */}
            <motion.div
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className={`text-lg font-orbitron font-bold ${getNeonColorClass()} mb-4`}>Delivery Address</h3>
              <div className="flex items-start space-x-3">
                <MapPin className={`${getNeonColorClass()} w-5 h-5 mt-1`} />
                <p className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {order.deliveryAddress}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
