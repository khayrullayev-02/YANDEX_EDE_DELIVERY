"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Search, MapPin, Clock, Star, Zap, Truck, Shield } from "lucide-react"
import useThemeStore from "../stores/themeStore"
import useCartStore from "../stores/cartStore"
import NeonButton from "../components/NeonButton"
import ParticleBackground from "../components/ParticleBackground"

const Home = () => {
  const { t } = useTranslation()
  const { getNeonColorClass, isDarkMode } = useThemeStore()
  const { addItem } = useCartStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data
  const categories = [
    { id: "all", name: "All", icon: "🍽️" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "burger", name: "Burgers", icon: "🍔" },
    { id: "sushi", name: "Sushi", icon: "🍣" },
    { id: "dessert", name: "Desserts", icon: "🍰" },
    { id: "drinks", name: "Drinks", icon: "🥤" },
  ]

  const featuredRestaurants = [
    {
      id: 1,
      name: "Neon Pizza Palace",
      image: "/futuristic-pizza-restaurant.jpg",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      category: "pizza",
      cuisine: "Italian",
      popular: true,
    },
    {
      id: 2,
      name: "Cyber Sushi Bar",
      image: "/neon-sushi-restaurant.jpg",
      rating: 4.9,
      deliveryTime: "30-40 min",
      deliveryFee: 3.99,
      category: "sushi",
      cuisine: "Japanese",
      popular: true,
    },
    {
      id: 3,
      name: "Electric Burger Co.",
      image: "/futuristic-burger-restaurant.jpg",
      rating: 4.7,
      deliveryTime: "20-30 min",
      deliveryFee: 1.99,
      category: "burger",
      cuisine: "American",
      popular: false,
    },
    {
      id: 4,
      name: "Glow Dessert Lab",
      image: "/neon-dessert-cafe.jpg",
      rating: 4.6,
      deliveryTime: "15-25 min",
      deliveryFee: 2.49,
      category: "dessert",
      cuisine: "Desserts",
      popular: false,
    },
  ]

  const popularItems = [
    {
      id: 1,
      name: "Neon Margherita Pizza",
      price: 18.99,
      image: "/glowing-pizza.jpg",
      restaurant: "Neon Pizza Palace",
      rating: 4.8,
      description: "Classic margherita with a futuristic twist",
    },
    {
      id: 2,
      name: "Cyber Dragon Roll",
      price: 24.99,
      image: "/glowing-sushi-roll.jpg",
      restaurant: "Cyber Sushi Bar",
      rating: 4.9,
      description: "Premium sushi roll with electric presentation",
    },
    {
      id: 3,
      name: "Electric Cheeseburger",
      price: 15.99,
      image: "/glowing-burger.jpg",
      restaurant: "Electric Burger Co.",
      rating: 4.7,
      description: "Juicy burger with neon cheese sauce",
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Average delivery time under 30 minutes",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Contactless delivery and secure payments",
    },
    {
      icon: Truck,
      title: "Real-time Tracking",
      description: "Track your order from kitchen to doorstep",
    },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-dark-900" : "bg-gray-50"}`}>
      <ParticleBackground particleCount={40} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className={`text-5xl md:text-7xl font-orbitron font-bold ${getNeonColorClass()} mb-6`}
            style={{ textShadow: "0 0 30px currentColor" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            NeonFood
          </motion.h1>

          <motion.p
            className={`text-xl md:text-2xl font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-8 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of food delivery with lightning-fast service and neon-bright flavors
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${getNeonColorClass()} w-6 h-6`} />
              <input
                type="text"
                placeholder={t("searchFood")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-14 pr-6 py-4 rounded-2xl border-2 ${
                  isDarkMode ? "bg-dark-800/50 border-gray-600 text-white" : "bg-white/90 border-gray-300 text-gray-900"
                } backdrop-blur-md focus:outline-none focus:border-current ${getNeonColorClass()} font-rajdhani text-lg transition-all duration-300`}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <NeonButton variant="primary" size="md">
                  Search
                </NeonButton>
              </div>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            className="flex items-center justify-center space-x-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MapPin className={`${getNeonColorClass()} w-5 h-5`} />
            <span className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Delivering to Tashkent, Uzbekistan
            </span>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className={`text-center p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className={`${getNeonColorClass()} w-12 h-12 mx-auto mb-4`} />
                  <h3 className={`text-xl font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
                    {feature.title}
                  </h3>
                  <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-3xl md:text-4xl font-orbitron font-bold ${getNeonColorClass()} text-center mb-12`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("categories")}
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `${getNeonColorClass()} border-current bg-current/10`
                    : isDarkMode
                      ? "border-gray-600 hover:border-gray-500 text-gray-300"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-rajdhani font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-3xl md:text-4xl font-orbitron font-bold ${getNeonColorClass()} text-center mb-12`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("popular")} Items
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`rounded-2xl overflow-hidden ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"} hover:border-current transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="text-yellow-400 w-4 h-4 fill-current" />
                    <span className="text-white text-sm font-rajdhani">{item.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
                    {item.name}
                  </h3>
                  <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                    {item.restaurant}
                  </p>
                  <p className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-orbitron font-bold ${getNeonColorClass()}`}>${item.price}</span>
                    <NeonButton variant="primary" size="sm" onClick={() => addItem(item)}>
                      {t("addToCart")}
                    </NeonButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-3xl md:text-4xl font-orbitron font-bold ${getNeonColorClass()} text-center mb-12`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("nearbyRestaurants")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                className={`rounded-2xl overflow-hidden ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"} hover:border-current transition-all duration-300 cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-40 object-cover"
                  />
                  {restaurant.popular && (
                    <div
                      className={`absolute top-3 left-3 ${getNeonColorClass()} bg-current text-black px-2 py-1 rounded-full text-xs font-orbitron font-bold`}
                    >
                      POPULAR
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="text-yellow-400 w-4 h-4 fill-current" />
                    <span className="text-white text-sm font-rajdhani">{restaurant.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className={`text-lg font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                    {restaurant.name}
                  </h3>
                  <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-3`}>
                    {restaurant.cuisine}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className={`${getNeonColorClass()} w-4 h-4`} />
                      <span className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {restaurant.deliveryTime}
                      </span>
                    </div>
                    <span className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      ${restaurant.deliveryFee} delivery
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/restaurants">
              <NeonButton variant="primary" size="lg">
                View All Restaurants
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
