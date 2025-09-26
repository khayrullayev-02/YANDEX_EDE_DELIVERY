"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
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
import { FaDollarSign, FaCalendarAlt, FaTruck, FaClock } from "react-icons/fa"
import ParticleBackground from "../../components/ParticleBackground"
import { apiService } from "../../services/api"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Earnings = () => {
  const [earningsData, setEarningsData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  })
  const [stats, setStats] = useState({
    todayEarnings: 0,
    weekEarnings: 0,
    monthEarnings: 0,
    totalEarnings: 0,
    averagePerDelivery: 0,
    totalDeliveries: 0,
    hoursWorked: 0,
    earningsPerHour: 0,
  })
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")
  const [loading, setLoading] = useState(true)

  const bgColor = useColorModeValue("gray.50", "gray.900")

  useEffect(() => {
    fetchEarningsData()
  }, [])

  const fetchEarningsData = async () => {
    try {
      setLoading(true)
      const [earningsResponse, statsResponse] = await Promise.all([
        apiService.get("/courier/earnings/data/"),
        apiService.get("/courier/earnings/stats/"),
      ])

      setEarningsData(earningsResponse.data)
      setStats(statsResponse.data)
    } catch (error) {
      console.error("Error fetching earnings data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getChartData = () => {
    const data = earningsData[selectedPeriod] || []
    return {
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: "Earnings ($)",
          data: data.map((item) => item.earnings),
          borderColor: "#00ffff",
          backgroundColor: "rgba(0, 255, 255, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: "#00ffff",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: true,
        },
      ],
    }
  }

  const deliveryTypeData = {
    labels: ["Food Delivery", "Grocery", "Pharmacy", "Other"],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: ["#00ffff", "#ff6b6b", "#ffd93d", "#6bcf7f"],
        borderColor: ["#00cccc", "#ff5252", "#ffcc02", "#4caf50"],
        borderWidth: 2,
      },
    ],
  }

  const hourlyEarningsData = {
    labels: ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
    datasets: [
      {
        label: "Hourly Earnings ($)",
        data: [15, 25, 30, 45, 35, 40, 55, 50, 30],
        backgroundColor: "rgba(255, 107, 107, 0.8)",
        borderColor: "#ff6b6b",
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
            <Heading size="2xl" color="white" textAlign="center" textShadow="0 0 20px #00ffff">
              Earnings Dashboard
            </Heading>

            {/* Stats Grid */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
              {[
                {
                  label: "Today's Earnings",
                  value: `$${stats.todayEarnings}`,
                  change: "+12%",
                  color: "#00ffff",
                  icon: FaDollarSign,
                },
                {
                  label: "This Week",
                  value: `$${stats.weekEarnings}`,
                  change: "+8%",
                  color: "#ff6b6b",
                  icon: FaCalendarAlt,
                },
                {
                  label: "Total Deliveries",
                  value: stats.totalDeliveries,
                  change: "+15%",
                  color: "#ffd93d",
                  icon: FaTruck,
                },
                {
                  label: "Avg per Hour",
                  value: `$${stats.earningsPerHour}`,
                  change: "+5%",
                  color: "#6bcf7f",
                  icon: FaClock,
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

            {/* Earnings Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
                <CardBody>
                  <HStack justify="space-between" mb={4}>
                    <Heading size="md" color="white">
                      Earnings Trend
                    </Heading>
                    <Select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      bg="gray.700"
                      color="white"
                      border="1px solid #00ffff"
                      w="150px"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </Select>
                  </HStack>
                  <Box h="400px">
                    <Line data={getChartData()} options={chartOptions} />
                  </Box>
                </CardBody>
              </Card>
            </motion.div>

            {/* Additional Charts */}
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
              {/* Delivery Types */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ff6b6b" boxShadow="0 0 30px #ff6b6b40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Delivery Types
                    </Heading>
                    <Box h="300px">
                      <Doughnut data={deliveryTypeData} options={doughnutOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Hourly Earnings */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ffd93d" boxShadow="0 0 30px #ffd93d40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Peak Hours
                    </Heading>
                    <Box h="300px">
                      <Bar data={hourlyEarningsData} options={chartOptions} />
                    </Box>
                  </CardBody>
                </Card>
              </motion.div>
            </Grid>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #6bcf7f" boxShadow="0 0 30px #6bcf7f40">
                <CardBody>
                  <Heading size="md" color="white" mb={6}>
                    Performance Metrics
                  </Heading>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                    <VStack spacing={3}>
                      <Text color="gray.300" fontSize="sm">
                        Average per Delivery
                      </Text>
                      <Text color="#6bcf7f" fontSize="2xl" fontWeight="bold">
                        ${stats.averagePerDelivery}
                      </Text>
                      <Progress value={75} colorScheme="green" size="sm" w="100%" bg="gray.700" />
                    </VStack>

                    <VStack spacing={3}>
                      <Text color="gray.300" fontSize="sm">
                        Hours Worked
                      </Text>
                      <Text color="#ffd93d" fontSize="2xl" fontWeight="bold">
                        {stats.hoursWorked}h
                      </Text>
                      <Progress value={60} colorScheme="yellow" size="sm" w="100%" bg="gray.700" />
                    </VStack>

                    <VStack spacing={3}>
                      <Text color="gray.300" fontSize="sm">
                        Monthly Goal
                      </Text>
                      <Text color="#ff6b6b" fontSize="2xl" fontWeight="bold">
                        85%
                      </Text>
                      <Progress value={85} colorScheme="red" size="sm" w="100%" bg="gray.700" />
                    </VStack>
                  </Grid>
                </CardBody>
              </Card>
            </motion.div>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  )
}

export default Earnings
