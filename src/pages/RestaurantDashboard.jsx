"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  DollarSign,
  Package,
  Clock,
  TrendingUp,
  Users,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Bell,
} from "lucide-react"
import useThemeStore from "../stores/themeStore"
import useAuthStore from "../stores/authStore"
import NeonButton from "../components/NeonButton"
import ParticleBackground from "../components/ParticleBackground"

const RestaurantDashboard = () => {
  const { t } = useTranslation()
  const { getNeonColorClass, isDarkMode } = useThemeStore()
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("week")

  // Mock data
  const stats = {
    totalRevenue: 15420.5,
    totalOrders: 342,
    avgOrderValue: 45.12,
    rating: 4.8,
    pendingOrders: 12,
    completedToday: 28,
  }

  const revenueData = [
    { name: "Mon", revenue: 2400, orders: 24 },
    { name: "Tue", revenue: 1398, orders: 18 },
    { name: "Wed", revenue: 9800, orders: 45 },
    { name: "Thu", revenue: 3908, orders: 32 },
    { name: "Fri", revenue: 4800, orders: 38 },
    { name: "Sat", revenue: 3800, orders: 42 },
    { name: "Sun", revenue: 4300, orders: 35 },
  ]

  const categoryData = [
    { name: "Pizza", value: 35, color: "#00f5ff" },
    { name: "Burgers", value: 25, color: "#bf00ff" },
    { name: "Pasta", value: 20, color: "#ff0080" },
    { name: "Salads", value: 12, color: "#00ff41" },
    { name: "Desserts", value: 8, color: "#ffff00" },
  ]

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      items: "Margherita Pizza, Coke",
      total: 24.99,
      status: "preparing",
      time: "5 min ago",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      items: "Cheeseburger, Fries",
      total: 18.5,
      status: "ready",
      time: "12 min ago",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      items: "Caesar Salad, Water",
      total: 15.99,
      status: "delivered",
      time: "25 min ago",
    },
  ]

  const menuItems = [
    {
      id: 1,
      name: "Neon Margherita Pizza",
      price: 18.99,
      category: "Pizza",
      status: "active",
      orders: 45,
      image: "/glowing-pizza.jpg",
    },
    {
      id: 2,
      name: "Electric Cheeseburger",
      price: 15.99,
      category: "Burgers",
      status: "active",
      orders: 32,
      image: "/glowing-burger.jpg",
    },
    {
      id: 3,
      name: "Cyber Pasta",
      price: 22.5,
      category: "Pasta",
      status: "inactive",
      orders: 18,
      image: "/placeholder.svg",
    },
  ]

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart },
    { id: "orders", name: "Orders", icon: Package },
    { id: "menu", name: "Menu", icon: Settings },
    { id: "analytics", name: "Analytics", icon: TrendingUp },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "text-yellow-500"
      case "ready":
        return "text-green-500"
      case "delivered":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const StatCard = ({ title, value, icon: Icon, change, color }) => (
    <motion.div
      className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>{title}</p>
          <p className={`text-2xl font-orbitron font-bold ${color || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            {value}
          </p>
          {change && (
            <p className={`text-sm font-rajdhani ${change > 0 ? "text-green-500" : "text-red-500"} mt-1`}>
              {change > 0 ? "+" : ""}
              {change}% from last week
            </p>
          )}
        </div>
        <Icon className={`${color || getNeonColorClass()} w-8 h-8`} />
      </div>
    </motion.div>
  )

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? "bg-dark-900" : "bg-gray-50"}`}>
      <ParticleBackground particleCount={25} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className={`text-3xl font-orbitron font-bold ${getNeonColorClass()} mb-2`}>Restaurant Dashboard</h1>
            <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Welcome back, {user?.firstName || "Restaurant Owner"}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode ? "bg-dark-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-current ${getNeonColorClass()} font-rajdhani`}
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            <motion.button
              className={`p-2 rounded-lg ${getNeonColorClass()} hover:bg-current/10 transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex space-x-1 mb-8 bg-dark-800/30 p-1 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
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
                <Icon size={18} />
                <span>{tab.name}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`$${stats.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                change={12.5}
                color="text-green-500"
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={Package}
                change={8.2}
                color="text-blue-500"
              />
              <StatCard
                title="Avg Order Value"
                value={`$${stats.avgOrderValue}`}
                icon={TrendingUp}
                change={-2.1}
                color="text-purple-500"
              />
              <StatCard title="Rating" value={stats.rating} icon={Star} change={0.3} color="text-yellow-500" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <div
                className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <h3 className={`text-xl font-orbitron font-bold ${getNeonColorClass()} mb-6`}>Revenue Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                        borderRadius: "8px",
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                    />
                    <Bar dataKey="revenue" fill="#00f5ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div
                className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <h3 className={`text-xl font-orbitron font-bold ${getNeonColorClass()} mb-6`}>Sales by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <div
              className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-orbitron font-bold ${getNeonColorClass()}`}>Recent Orders</h3>
                <NeonButton variant="ghost" size="sm">
                  View All
                </NeonButton>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? "bg-dark-700/50" : "bg-gray-50"} border ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {order.id}
                          </p>
                          <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
                            {order.customer}
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {order.items}
                          </p>
                          <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
                            {order.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`font-orbitron font-bold ${getNeonColorClass()}`}>${order.total}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-rajdhani font-medium ${getStatusColor(order.status)} bg-current/10`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Tab */}
        {activeTab === "menu" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-orbitron font-bold ${getNeonColorClass()}`}>Menu Management</h2>
              <NeonButton variant="primary" size="md">
                <Plus size={18} />
                Add New Item
              </NeonButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`rounded-2xl overflow-hidden ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                    <div
                      className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-orbitron font-bold ${
                        item.status === "active" ? "bg-green-500 text-black" : "bg-red-500 text-white"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className={`text-lg font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}
                    >
                      {item.name}
                    </h3>
                    <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                      {item.category}
                    </p>
                    <p className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
                      {item.orders} orders this week
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-orbitron font-bold ${getNeonColorClass()}`}>${item.price}</span>
                      <div className="flex space-x-2">
                        <motion.button
                          className={`p-2 rounded-lg ${getNeonColorClass()} hover:bg-current/10 transition-colors duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye size={16} />
                        </motion.button>
                        <motion.button
                          className={`p-2 rounded-lg ${getNeonColorClass()} hover:bg-current/10 transition-colors duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit size={16} />
                        </motion.button>
                        <motion.button
                          className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-orbitron font-bold ${getNeonColorClass()}`}>Order Management</h2>
              <div className="flex space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-rajdhani ${getNeonColorClass()} bg-current/10`}>
                  {stats.pendingOrders} Pending
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-rajdhani text-green-500 bg-green-500/10">
                  {stats.completedToday} Completed Today
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-6">
                        <div>
                          <p
                            className={`font-orbitron font-bold ${isDarkMode ? "text-white" : "text-gray-900"} text-lg`}
                          >
                            {order.id}
                          </p>
                          <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {order.customer}
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className={`font-rajdhani ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                            {order.items}
                          </p>
                          <p className={`font-rajdhani ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
                            {order.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <span className={`font-orbitron font-bold ${getNeonColorClass()} text-xl`}>${order.total}</span>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-rajdhani font-medium ${getStatusColor(order.status)} bg-current/10`}
                      >
                        {order.status}
                      </span>
                      <div className="flex space-x-2">
                        <NeonButton variant="ghost" size="sm">
                          View
                        </NeonButton>
                        {order.status === "preparing" && (
                          <NeonButton variant="primary" size="sm">
                            Mark Ready
                          </NeonButton>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className={`text-2xl font-orbitron font-bold ${getNeonColorClass()}`}>Analytics & Insights</h2>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Peak Hours" value="7-9 PM" icon={Clock} color="text-orange-500" />
              <StatCard title="Top Category" value="Pizza" icon={TrendingUp} color="text-purple-500" />
              <StatCard title="Customer Retention" value="78%" icon={Users} change={5.2} color="text-green-500" />
            </div>

            {/* Detailed Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <h3 className={`text-xl font-orbitron font-bold ${getNeonColorClass()} mb-6`}>Order Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                        borderRadius: "8px",
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#00f5ff"
                      strokeWidth={3}
                      dot={{ fill: "#00f5ff", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div
                className={`p-6 rounded-2xl ${isDarkMode ? "bg-dark-800/50" : "bg-white/90"} backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <h3 className={`text-xl font-orbitron font-bold ${getNeonColorClass()} mb-6`}>Revenue Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                        borderRadius: "8px",
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                    />
                    <Bar dataKey="revenue" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#bf00ff" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RestaurantDashboard
