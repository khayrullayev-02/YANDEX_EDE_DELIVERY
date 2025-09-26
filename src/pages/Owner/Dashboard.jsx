"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react"
import { Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import ParticleBackground from "../../components/ParticleBackground"
import { useAuthStore } from "../../stores/authStore"
import { apiService } from "../../services/api"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    completedOrders: 0,
    averageRating: 0,
    totalMenuItems: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const bgColor = useColorModeValue("gray.50", "gray.900")
  const cardBg = useColorModeValue("white", "gray.800")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, ordersResponse] = await Promise.all([
        apiService.get("/owner/dashboard/stats/"),
        apiService.get("/owner/orders/recent/"),
      ])

      setStats(statsResponse.data)
      setRecentOrders(ordersResponse.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        borderColor: "#00ffff",
        backgroundColor: "rgba(0, 255, 255, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#00ffff",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        shadowColor: "#00ffff",
        shadowBlur: 10,
      },
    ],
  }

  const orderStatusData = {
    labels: ["Pending", "Preparing", "Ready", "Delivered"],
    datasets: [
      {
        data: [12, 8, 5, 25],
        backgroundColor: ["#ff6b6b", "#ffd93d", "#6bcf7f", "#4ecdc4"],
        borderColor: ["#ff5252", "#ffcc02", "#4caf50", "#26a69a"],
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: {
            size: 12,
            family: "Inter",
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
          font: {
            size: 12,
            family: "Inter",
          },
        },
      },
    },
  }

  if (loading) {
    return (
      <Box minH="100vh" bg={bgColor} position="relative">
        <ParticleBackground />
        <Box display="flex" alignItems="center" justifyContent="center" minH="100vh" position="relative" zIndex={2}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Box
              w="60px"
              h="60px"
              border="4px solid transparent"
              borderTop="4px solid #00ffff"
              borderRadius="50%"
              boxShadow="0 0 20px #00ffff"
            />
          </motion.div>
        </Box>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg={bgColor} position="relative">
      <ParticleBackground />

      <Box position="relative" zIndex={2} p={8}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Box>
              <Heading size="2xl" color="white" textAlign="center" textShadow="0 0 20px #00ffff" mb={2}>
                Restaurant Dashboard
              </Heading>
              <Text color="gray.300" textAlign="center" fontSize="lg">
                Welcome back, {user?.restaurant_name || "Restaurant Owner"}!
              </Text>
            </Box>

            {/* Stats Grid */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
              {[
                { label: "Total Orders", value: stats.totalOrders, change: "+12%", color: "#00ffff" },
                { label: "Revenue", value: `$${stats.totalRevenue}`, change: "+8%", color: "#ff6b6b" },
                { label: "Active Orders", value: stats.activeOrders, change: "+5%", color: "#ffd93d" },
                { label: "Avg Rating", value: stats.averageRating.toFixed(1), change: "+0.2", color: "#6bcf7f" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    bg="rgba(0, 0, 0, 0.7)"
                    border="1px solid"
                    borderColor={stat.color}
                    boxShadow={`0 0 20px ${stat.color}40`}
                    _hover={{
                      transform: "translateY(-5px)",
                      boxShadow: `0 10px 30px ${stat.color}60`,
                    }}
                    transition="all 0.3s ease"
                  >
                    <CardBody>
                      <Stat>
                        <StatLabel color="gray.300" fontSize="sm">
                          {stat.label}
                        </StatLabel>
                        <StatNumber color={stat.color} fontSize="2xl" textShadow={`0 0 10px ${stat.color}`}>
                          {stat.value}
                        </StatNumber>
                        <StatHelpText color="green.400">
                          <StatArrow type="increase" />
                          {stat.change}
                        </StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </Grid>

            {/* Charts Section */}
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
              {/* Sales Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Sales Overview
                    </Heading>
                    <Box h="300px">
                      <Line data={salesData} options={chartOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Order Status Chart */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ff6b6b" boxShadow="0 0 30px #ff6b6b40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Order Status
                    </Heading>
                    <Box h="300px">
                      <Doughnut data={orderStatusData} options={doughnutOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>
            </Grid>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ffd93d" boxShadow="0 0 30px #ffd93d40">
                <CardBody>
                  <Heading size="md" color="white" mb={4}>
                    Recent Orders
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    {recentOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Box
                          p={4}
                          bg="rgba(255, 255, 255, 0.05)"
                          borderRadius="lg"
                          border="1px solid rgba(255, 255, 255, 0.1)"
                          _hover={{
                            bg: "rgba(255, 255, 255, 0.1)",
                            transform: "translateX(5px)",
                          }}
                          transition="all 0.3s ease"
                        >
                          <HStack justify="space-between">
                            <VStack align="start" spacing={1}>
                              <Text color="white" fontWeight="bold">
                                Order #{order.id}
                              </Text>
                              <Text color="gray.300" fontSize="sm">
                                {order.customer_name}
                              </Text>
                            </VStack>
                            <VStack align="end" spacing={1}>
                              <Badge
                                colorScheme={
                                  order.status === "delivered"
                                    ? "green"
                                    : order.status === "preparing"
                                      ? "yellow"
                                      : order.status === "pending"
                                        ? "red"
                                        : "blue"
                                }
                                variant="solid"
                              >
                                {order.status}
                              </Badge>
                              <Text color="#00ffff" fontWeight="bold">
                                ${order.total}
                              </Text>
                            </VStack>
                          </HStack>
                        </Box>
                      </motion.div>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </motion.div>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  )
}

export default Dashboard
