"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Box,
  Card,
  CardBody,
  Heading,
  VStack,
  HStack,
  Grid,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
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
import { FaDollarSign, FaShoppingCart, FaUsers, FaTrendingUp } from "react-icons/fa"
import ParticleBackground from "../../components/ParticleBackground"
import { apiService } from "../../services/api"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const SalesAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    customerCount: 0,
  })
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")
  const [loading, setLoading] = useState(true)

  const bgColor = useColorModeValue("gray.50", "gray.900")

  useEffect(() => {
    fetchAnalytics()
  }, [selectedPeriod])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await apiService.get(`/owner/analytics/?period=${selectedPeriod}`)
      setAnalytics(response.data)
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1900, 3000, 5000, 2000, 3000],
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

  const ordersData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 30, 50, 20, 30, 45],
        backgroundColor: "rgba(255, 107, 107, 0.8)",
        borderColor: "#ff6b6b",
        borderWidth: 2,
      },
    ],
  }

  const categoryData = {
    labels: ["Appetizers", "Main Course", "Desserts", "Beverages"],
    datasets: [
      {
        data: [30, 45, 15, 10],
        backgroundColor: ["#00ffff", "#ff6b6b", "#ffd93d", "#6bcf7f"],
        borderColor: ["#00cccc", "#ff5252", "#ffcc02", "#4caf50"],
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
              <Heading size="2xl" color="white" textShadow="0 0 20px #00ffff">
                Sales Analytics
              </Heading>
              <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                bg="gray.700"
                color="white"
                border="1px solid #00ffff"
                w="200px"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
            </HStack>

            {/* Stats Grid */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
              {[
                {
                  label: "Total Revenue",
                  value: `$${analytics.totalRevenue.toLocaleString()}`,
                  change: "+12%",
                  color: "#00ffff",
                  icon: FaDollarSign,
                },
                {
                  label: "Total Orders",
                  value: analytics.totalOrders,
                  change: "+8%",
                  color: "#ff6b6b",
                  icon: FaShoppingCart,
                },
                {
                  label: "Avg Order Value",
                  value: `$${analytics.averageOrderValue}`,
                  change: "+15%",
                  color: "#ffd93d",
                  icon: FaTrendingUp,
                },
                {
                  label: "Customers",
                  value: analytics.customerCount,
                  change: "+22%",
                  color: "#6bcf7f",
                  icon: FaUsers,
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

            {/* Charts */}
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
                      Revenue Trend
                    </Heading>
                    <Box h="300px">
                      <Line data={revenueData} options={chartOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Category Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ff6b6b" boxShadow="0 0 30px #ff6b6b40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Sales by Category
                    </Heading>
                    <Box h="300px">
                      <Doughnut data={categoryData} options={doughnutOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>
            </Grid>

            {/* Orders Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ffd93d" boxShadow="0 0 30px #ffd93d40">
                <CardBody>
                  <Heading size="md" color="white" mb={4}>
                    Daily Orders
                  </Heading>
                  <Box h="300px">
                    <Bar data={ordersData} options={chartOptions} />
                  </Box>
                </CardBody>
              </Card>
            </motion.div>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  )
}

export default SalesAnalytics
