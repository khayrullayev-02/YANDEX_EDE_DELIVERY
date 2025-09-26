"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Package, Clock, MapPin, Star, Eye, Repeat } from "lucide-react"
import useThemeStore from "../stores/themeStore"
import useAuthStore from "../stores/authStore"
import NeonButton from "../components/NeonButton"
import ParticleBackground from "../components/ParticleBackground"

const Orders = () => {
  const { t } = useTranslation()
  const { getNeonColorClass, isDarkMode } = useThemeStore()
  const { isAuthenticated } = useAuthStore()
  const [activeTab, setActiveTab] = useState("active")

  // Mock orders data
  const orders = {
    active: [
      {
        id: "#ORD-001",
        restaurant: "Neon Pizza Palace",
        items: ["Neon Margherita Pizza", "Cyber Cola"],
        total: 26.97,
        status: "preparing",
        estimatedTime: "25 min",
        orderTime: "18:30",
        image: "/futuristic-pizza-restaurant.jpg",
      },
      {
        id: "#ORD-002",
        restaurant: "Cyber Sushi Bar",
        items: ["Dragon Roll", "Miso Soup"],
        total: 32.5,
        status: "out_for_delivery",
        estimatedTime: "15 min",
        orderTime: "18:45",
        image: "/neon-sushi-restaurant.jpg",
      },
    ],
    completed: [
      {
        id: "#ORD-003",
        restaurant: "Electric Burger Co.",
        items: ["Electric Cheeseburger", "Neon Fries"],
        total: 19.99,
        status: "delivered",
        deliveredTime: "Yesterday, 19:30",
        orderTime: "Yesterday, 18:50",
        rating: 5,
        image: "/futuristic-burger-restaurant.jpg",
      },
      {
        id: "#ORD-004",
        restaurant: "Glow Dessert Lab",
        items: ["Neon Cheesecake", "Glowing Smoothie"],
        total: 15.5,
        status: "delivered",
        deliveredTime: "2 days ago, 16:15",
        orderTime: "2 days ago, 15:30",
        rating: 4,
        image: "/neon-dessert-cafe.jpg",
      },
    ],
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "text-yellow-500"
      case "out_for_delivery":
        return "text-blue-500"
      case "delivered":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "preparing":
        return "Preparing"
      case "out_for_delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      default:
        return status
    }
  }

  if (!isAuthenticated) {
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
            <Package className={`${getNeonColorClass()} w-24 h-24 mx-auto mb-6`} />
            <h1 className={`text-3xl font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
              Please Login
            </h1>
            <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-8 text-lg`}>
              You need to be logged in to view your orders
            </p>
            <Link to="/login">
              <NeonButton variant="primary" size="lg">
                Login to Continue
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl font-orbitron font-bold ${getNeonColorClass()} mb-4`}>Your Orders</h1>
          <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-lg`}>
            Track your current orders and view order history
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex space-x-1 bg-dark-800/30 p-1 rounded-xl">
            {[
              { id: "active", name: "Active Orders", count: orders.active.length },
              { id: "completed", name: "Order History", count: orders.completed.length },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-rajdhani font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? `${getNeonColorClass()} bg-current/10 text-current`
                    : isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{tab.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${activeTab === tab.id ? "bg-current/20" : "bg-gray-600"}`}
                >
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders[activeTab].map((order, index) => (
            <motion.div
              key={order.id}
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <img
                    src={order.image || "/placeholder.svg"}
                    alt={order.restaurant}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div>
                    <h3
                      className={`text-xl font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}
                    >
                      {order.id}
                    </h3>
                    <p className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                      {order.restaurant}
                    </p>
                    <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-2`}>
                      {order.items.join(", ")}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className={`${getNeonColorClass()} w-4 h-4`} />
                        <span className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {order.orderTime}
                        </span>
                      </div>
                      {order.deliveredTime && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="text-green-500 w-4 h-4" />
                          <span className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {order.deliveredTime}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-2xl font-orbitron font-bold ${getNeonColorClass()} mb-2`}>
                    ${order.total.toFixed(2)}
                  </p>

                  <div className="flex items-center justify-end space-x-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-rajdhani font-medium ${getStatusColor(order.status)} bg-current/10`}
                    >
                      {getStatusText(order.status)}
                    </span>
                    {order.estimatedTime && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-rajdhani ${getNeonColorClass()} bg-current/10`}
                      >
                        {order.estimatedTime}
                      </span>
                    )}
                  </div>

                  {order.rating && (
                    <div className="flex items-center justify-end space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < order.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {activeTab === "active" ? (
                      <Link to={`/order/${order.id.replace("#", "")}`}>
                        <NeonButton variant="primary" size="sm">
                          <Eye size={16} />
                          Track Order
                        </NeonButton>
                      </Link>
                    ) : (
                      <>
                        <NeonButton variant="ghost" size="sm">
                          <Eye size={16} />
                          View Details
                        </NeonButton>
                        <NeonButton variant="primary" size="sm">
                          <Repeat size={16} />
                          Reorder
                        </NeonButton>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {orders[activeTab].length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Package className={`${getNeonColorClass()} w-24 h-24 mx-auto mb-6`} />
            <h3 className={`text-2xl font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
              No {activeTab} orders
            </h3>
            <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
              {activeTab === "active"
                ? "You don't have any active orders right now"
                : "You haven't placed any orders yet"}
            </p>
            <Link to="/restaurants">
              <NeonButton variant="primary" size="lg">
                Browse Restaurants
              </NeonButton>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Orders
