"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Box,
  Grid,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react"
import { Line, Bar, Doughnut } from "react-chartjs-2"
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
import {
  FaUsers,
  FaStore,
  FaTruck,
  FaDollarSign,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa"
import ParticleBackground from "../../components/ParticleBackground"
import { apiService } from "../../services/api"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalCouriers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    pendingApprovals: 0,
    systemHealth: 98,
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [platformMetrics, setPlatformMetrics] = useState({})
  const [loading, setLoading] = useState(true)

  const bgColor = useColorModeValue("gray.50", "gray.900")

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, activityResponse, metricsResponse] = await Promise.all([
        apiService.get("/admin/dashboard/stats/"),
        apiService.get("/admin/dashboard/activity/"),
        apiService.get("/admin/dashboard/metrics/"),
      ])

      setStats(statsResponse.data)
      setRecentActivity(activityResponse.data)
      setPlatformMetrics(metricsResponse.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Platform Revenue ($)",
        data: [12000, 19000, 30000, 50000, 20000, 30000],
        borderColor: "#00ffff",
        backgroundColor: "rgba(0, 255, 255, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "#00ffff",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        fill: true,
      },
    ],
  }

  const userGrowthData = {
    labels: ["Customers", "Restaurants", "Couriers"],
    datasets: [
      {
        data: [
          stats.totalUsers - stats.totalRestaurants - stats.totalCouriers,
          stats.totalRestaurants,
          stats.totalCouriers,
        ],
        backgroundColor: ["#00ffff", "#ff6b6b", "#ffd93d"],
        borderColor: ["#00cccc", "#ff5252", "#ffcc02"],
        borderWidth: 2,
      },
    ],
  }

  const orderStatusData = {
    labels: ["Pending", "Preparing", "In Transit", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [45, 32, 28, 156, 12],
        backgroundColor: ["#ff6b6b", "#ffd93d", "#4ecdc4", "#6bcf7f", "#95a5a6"],
        borderColor: ["#ff5252", "#ffcc02", "#26a69a", "#4caf50", "#7f8c8d"],
        borderWidth: 2,
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
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={2}>
                <Heading size="2xl" color="white" textShadow="0 0 20px #00ffff">
                  Admin Dashboard
                </Heading>
                <Text color="gray.300" fontSize="lg">
                  Platform Overview & Management
                </Text>
              </VStack>

              <Card
                bg="rgba(0, 0, 0, 0.8)"
                border="1px solid"
                borderColor={stats.systemHealth > 95 ? "#00ff00" : stats.systemHealth > 85 ? "#ffd93d" : "#ff6b6b"}
                boxShadow={`0 0 20px ${stats.systemHealth > 95 ? "#00ff0040" : stats.systemHealth > 85 ? "#ffd93d40" : "#ff6b6b40"}`}
              >
                <CardBody>
                  <VStack spacing={2}>
                    <Text color="white" fontSize="sm" fontWeight="bold">
                      System Health
                    </Text>
                    <Text
                      color={stats.systemHealth > 95 ? "#00ff00" : stats.systemHealth > 85 ? "#ffd93d" : "#ff6b6b"}
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      {stats.systemHealth}%
                    </Text>
                    <Progress
                      value={stats.systemHealth}
                      colorScheme={stats.systemHealth > 95 ? "green" : stats.systemHealth > 85 ? "yellow" : "red"}
                      size="sm"
                      w="100px"
                    />
                  </VStack>
                </CardBody>
              </Card>
            </HStack>

            {/* Key Metrics */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
              {[
                {
                  label: "Total Users",
                  value: stats.totalUsers.toLocaleString(),
                  change: "+12%",
                  color: "#00ffff",
                  icon: FaUsers,
                },
                {
                  label: "Active Restaurants",
                  value: stats.totalRestaurants,
                  change: "+8%",
                  color: "#ff6b6b",
                  icon: FaStore,
                },
                {
                  label: "Active Couriers",
                  value: stats.totalCouriers,
                  change: "+15%",
                  color: "#ffd93d",
                  icon: FaTruck,
                },
                {
                  label: "Platform Revenue",
                  value: `$${stats.totalRevenue.toLocaleString()}`,
                  change: "+22%",
                  color: "#6bcf7f",
                  icon: FaDollarSign,
                },
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
                        <HStack>
                          <Box as={stat.icon} color={stat.color} size="20px" />
                          <StatLabel color="gray.300" fontSize="sm">
                            {stat.label}
                          </StatLabel>
                        </HStack>
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
              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Platform Revenue Trend
                    </Heading>
                    <Box h="300px">
                      <Line data={revenueData} options={chartOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>

              {/* User Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ff6b6b" boxShadow="0 0 30px #ff6b6b40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      User Distribution
                    </Heading>
                    <Box h="300px">
                      <Doughnut data={userGrowthData} options={doughnutOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>
            </Grid>

            {/* Order Status & Recent Activity */}
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
              {/* Order Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ffd93d" boxShadow="0 0 30px #ffd93d40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Order Status Overview
                    </Heading>
                    <Box h="300px">
                      <Bar data={orderStatusData} options={chartOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #6bcf7f" boxShadow="0 0 30px #6bcf7f40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Recent Activity
                    </Heading>
                    <VStack spacing={3} align="stretch" maxH="250px" overflowY="auto">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <HStack
                            p={3}
                            bg="rgba(255, 255, 255, 0.05)"
                            borderRadius="md"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                          >
                            <Box
                              as={
                                activity.type === "order"
                                  ? FaChartLine
                                  : activity.type === "user"
                                    ? FaUsers
                                    : activity.type === "restaurant"
                                      ? FaStore
                                      : activity.type === "warning"
                                        ? FaExclamationTriangle
                                        : FaCheckCircle
                              }
                              color={
                                activity.type === "order"
                                  ? "#00ffff"
                                  : activity.type === "user"
                                    ? "#6bcf7f"
                                    : activity.type === "restaurant"
                                      ? "#ff6b6b"
                                      : activity.type === "warning"
                                        ? "#ffd93d"
                                        : "#00ff00"
                              }
                              size="16px"
                            />
                            <VStack align="start" spacing={0} flex="1">
                              <Text color="white" fontSize="sm" fontWeight="medium">
                                {activity.message}
                              </Text>
                              <HStack>
                                <Text color="gray.400" fontSize="xs">
                                  {activity.timestamp}
                                </Text>
                                <Badge
                                  size="sm"
                                  colorScheme={
                                    activity.type === "order"
                                      ? "cyan"
                                      : activity.type === "user"
                                        ? "green"
                                        : activity.type === "restaurant"
                                          ? "red"
                                          : activity.type === "warning"
                                            ? "yellow"
                                            : "green"
                                  }
                                >
                                  {activity.type}
                                </Badge>
                              </HStack>
                            </VStack>
                          </HStack>
                        </motion.div>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </motion.div>
            </Grid>

            {/* System Alerts & Quick Actions */}
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
              {/* System Alerts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ff6b6b" boxShadow="0 0 30px #ff6b6b40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      System Alerts
                    </Heading>
                    <VStack spacing={3} align="stretch">
                      {[
                        { type: "warning", message: "3 restaurants pending approval", priority: "medium" },
                        { type: "info", message: "Server maintenance scheduled for tonight", priority: "low" },
                        { type: "error", message: "Payment gateway experiencing delays", priority: "high" },
                        { type: "success", message: "Daily backup completed successfully", priority: "low" },
                      ].map((alert, index) => (
                        <HStack
                          key={index}
                          p={3}
                          bg="rgba(255, 255, 255, 0.05)"
                          borderRadius="md"
                          border="1px solid"
                          borderColor={
                            alert.priority === "high" ? "#ff6b6b" : alert.priority === "medium" ? "#ffd93d" : "#6bcf7f"
                          }
                        >
                          <Box
                            as={
                              alert.type === "warning"
                                ? FaExclamationTriangle
                                : alert.type === "error"
                                  ? FaExclamationTriangle
                                  : alert.type === "success"
                                    ? FaCheckCircle
                                    : FaClock
                            }
                            color={
                              alert.priority === "high"
                                ? "#ff6b6b"
                                : alert.priority === "medium"
                                  ? "#ffd93d"
                                  : "#6bcf7f"
                            }
                            size="16px"
                          />
                          <Text color="white" fontSize="sm" flex="1">
                            {alert.message}
                          </Text>
                          <Badge
                            colorScheme={
                              alert.priority === "high" ? "red" : alert.priority === "medium" ? "yellow" : "green"
                            }
                            size="sm"
                          >
                            {alert.priority}
                          </Badge>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #6bcf7f" boxShadow="0 0 30px #6bcf7f40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Quick Stats
                    </Heading>
                    <VStack spacing={4}>
                      <HStack justify="space-between" w="100%">
                        <Text color="gray.300" fontSize="sm">
                          Active Orders
                        </Text>
                        <Text color="#00ffff" fontWeight="bold">
                          {stats.activeOrders}
                        </Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color="gray.300" fontSize="sm">
                          Pending Approvals
                        </Text>
                        <Text color="#ffd93d" fontWeight="bold">
                          {stats.pendingApprovals}
                        </Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color="gray.300" fontSize="sm">
                          Today's Orders
                        </Text>
                        <Text color="#6bcf7f" fontWeight="bold">
                          247
                        </Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color="gray.300" fontSize="sm">
                          Online Couriers
                        </Text>
                        <Text color="#ff6b6b" fontWeight="bold">
                          89
                        </Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color="gray.300" fontSize="sm">
                          Avg Response Time
                        </Text>
                        <Text color="#00ffff" fontWeight="bold">
                          1.2s
                        </Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color="gray.300" fontSize="sm">
                          Success Rate
                        </Text>
                        <Text color="#6bcf7f" fontWeight="bold">
                          99.2%
                        </Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              </motion.div>
            </Grid>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  )
}

export default AdminDashboard
