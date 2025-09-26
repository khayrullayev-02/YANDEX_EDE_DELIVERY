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
  Button,
  VStack,
  HStack,
  Badge,
  Switch,
  FormControl,
  FormLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaRoute } from "react-icons/fa"
import ParticleBackground from "../../components/ParticleBackground"
import { useAuthStore } from "../../stores/authStore"
import { apiService } from "../../services/api"

const CourierDashboard = () => {
  const { user } = useAuthStore()
  const [isOnline, setIsOnline] = useState(false)
  const [stats, setStats] = useState({
    todayEarnings: 0,
    totalDeliveries: 0,
    averageRating: 0,
    completedToday: 0,
  })
  const [activeDeliveries, setActiveDeliveries] = useState([])
  const [availableOrders, setAvailableOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const bgColor = useColorModeValue("gray.50", "gray.900")

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, activeResponse, availableResponse] = await Promise.all([
        apiService.get("/courier/dashboard/stats/"),
        apiService.get("/courier/deliveries/active/"),
        apiService.get("/courier/orders/available/"),
      ])

      setStats(statsResponse.data)
      setActiveDeliveries(activeResponse.data)
      setAvailableOrders(availableResponse.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleOnlineStatus = async () => {
    try {
      const newStatus = !isOnline
      await apiService.post("/courier/status/", { is_online: newStatus })
      setIsOnline(newStatus)
      toast({
        title: newStatus ? "You are now online" : "You are now offline",
        description: newStatus ? "You will receive delivery requests" : "You will not receive new orders",
        status: newStatus ? "success" : "info",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update status",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const acceptOrder = async (orderId) => {
    try {
      await apiService.post(`/courier/orders/${orderId}/accept/`)
      toast({
        title: "Order Accepted",
        description: "You have accepted the delivery order",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      fetchDashboardData()
    } catch (error) {
      console.error("Error accepting order:", error)
      toast({
        title: "Error",
        description: "Failed to accept order",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const updateDeliveryStatus = async (deliveryId, status) => {
    try {
      await apiService.post(`/courier/deliveries/${deliveryId}/status/`, { status })
      toast({
        title: "Status Updated",
        description: `Delivery marked as ${status}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      fetchDashboardData()
    } catch (error) {
      console.error("Error updating delivery status:", error)
      toast({
        title: "Error",
        description: "Failed to update delivery status",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
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
                  Courier Dashboard
                </Heading>
                <Text color="gray.300" fontSize="lg">
                  Welcome back, {user?.first_name || "Courier"}!
                </Text>
              </VStack>

              <Card
                bg="rgba(0, 0, 0, 0.8)"
                border="1px solid"
                borderColor={isOnline ? "#00ff00" : "#ff6b6b"}
                boxShadow={`0 0 20px ${isOnline ? "#00ff0040" : "#ff6b6b40"}`}
              >
                <CardBody>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel color="white" mb="0" mr={4}>
                      {isOnline ? "Online" : "Offline"}
                    </FormLabel>
                    <Switch
                      isChecked={isOnline}
                      onChange={toggleOnlineStatus}
                      colorScheme={isOnline ? "green" : "red"}
                      size="lg"
                    />
                  </FormControl>
                </CardBody>
              </Card>
            </HStack>

            {/* Stats Grid */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
              {[
                {
                  label: "Today's Earnings",
                  value: `$${stats.todayEarnings}`,
                  icon: FaDollarSign,
                  color: "#00ffff",
                  change: "+15%",
                },
                {
                  label: "Total Deliveries",
                  value: stats.totalDeliveries,
                  icon: FaRoute,
                  color: "#ff6b6b",
                  change: "+8%",
                },
                {
                  label: "Average Rating",
                  value: stats.averageRating.toFixed(1),
                  icon: FaMapMarkerAlt,
                  color: "#ffd93d",
                  change: "+0.2",
                },
                {
                  label: "Completed Today",
                  value: stats.completedToday,
                  icon: FaClock,
                  color: "#6bcf7f",
                  change: "+3",
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

            {/* Active Deliveries */}
            {activeDeliveries.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Active Deliveries
                    </Heading>
                    <VStack spacing={4} align="stretch">
                      {activeDeliveries.map((delivery, index) => (
                        <motion.div
                          key={delivery.id}
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
                            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }} gap={4}>
                              <VStack align="start" spacing={2}>
                                <HStack>
                                  <Text color="white" fontWeight="bold">
                                    Order #{delivery.order_id}
                                  </Text>
                                  <Badge
                                    colorScheme={
                                      delivery.status === "picked_up"
                                        ? "blue"
                                        : delivery.status === "in_transit"
                                          ? "yellow"
                                          : "green"
                                    }
                                  >
                                    {delivery.status.replace("_", " ")}
                                  </Badge>
                                </HStack>
                                <Text color="gray.300" fontSize="sm">
                                  {delivery.restaurant_name}
                                </Text>
                                <Text color="gray.400" fontSize="sm">
                                  To: {delivery.delivery_address}
                                </Text>
                              </VStack>

                              <VStack align="center" spacing={2}>
                                <Text color="#00ffff" fontWeight="bold">
                                  ${delivery.delivery_fee}
                                </Text>
                                <Text color="gray.400" fontSize="sm">
                                  {delivery.distance} km
                                </Text>
                              </VStack>

                              <VStack spacing={2}>
                                {delivery.status === "assigned" && (
                                  <Button
                                    size="sm"
                                    colorScheme="blue"
                                    onClick={() => updateDeliveryStatus(delivery.id, "picked_up")}
                                  >
                                    Mark Picked Up
                                  </Button>
                                )}
                                {delivery.status === "picked_up" && (
                                  <Button
                                    size="sm"
                                    colorScheme="yellow"
                                    onClick={() => updateDeliveryStatus(delivery.id, "in_transit")}
                                  >
                                    In Transit
                                  </Button>
                                )}
                                {delivery.status === "in_transit" && (
                                  <Button
                                    size="sm"
                                    colorScheme="green"
                                    onClick={() => updateDeliveryStatus(delivery.id, "delivered")}
                                  >
                                    Mark Delivered
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  colorScheme="cyan"
                                  onClick={() =>
                                    window.open(`https://maps.google.com/maps?q=${delivery.delivery_address}`, "_blank")
                                  }
                                >
                                  Navigate
                                </Button>
                              </VStack>
                            </Grid>
                          </Box>
                        </motion.div>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Available Orders */}
            {isOnline && availableOrders.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ffd93d" boxShadow="0 0 30px #ffd93d40">
                  <CardBody>
                    <Heading size="md" color="white" mb={4}>
                      Available Orders
                    </Heading>
                    <VStack spacing={4} align="stretch">
                      {availableOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Box
                            p={4}
                            bg="rgba(255, 255, 255, 0.05)"
                            borderRadius="lg"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            _hover={{
                              bg: "rgba(255, 255, 255, 0.1)",
                              transform: "scale(1.02)",
                            }}
                            transition="all 0.3s ease"
                          >
                            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }} gap={4}>
                              <VStack align="start" spacing={2}>
                                <Text color="white" fontWeight="bold">
                                  Order #{order.id}
                                </Text>
                                <Text color="gray.300" fontSize="sm">
                                  {order.restaurant_name}
                                </Text>
                                <Text color="gray.400" fontSize="sm">
                                  To: {order.delivery_address}
                                </Text>
                                <HStack>
                                  <Badge colorScheme="orange">{order.distance} km</Badge>
                                  <Badge colorScheme="purple">~{order.estimated_time} min</Badge>
                                </HStack>
                              </VStack>

                              <VStack align="center" spacing={2}>
                                <Text color="#ffd93d" fontWeight="bold" fontSize="lg">
                                  ${order.delivery_fee}
                                </Text>
                                <Text color="gray.400" fontSize="sm">
                                  Delivery Fee
                                </Text>
                              </VStack>

                              <VStack justify="center">
                                <Button
                                  colorScheme="green"
                                  onClick={() => acceptOrder(order.id)}
                                  boxShadow="0 0 15px #00ff0040"
                                  _hover={{
                                    boxShadow: "0 0 25px #00ff0060",
                                    transform: "translateY(-2px)",
                                  }}
                                >
                                  Accept Order
                                </Button>
                              </VStack>
                            </Grid>
                          </Box>
                        </motion.div>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* No Orders Message */}
            {isOnline && availableOrders.length === 0 && activeDeliveries.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #666" boxShadow="0 0 20px #66666640">
                  <CardBody textAlign="center" py={12}>
                    <Text color="gray.400" fontSize="lg">
                      No orders available at the moment
                    </Text>
                    <Text color="gray.500" fontSize="sm" mt={2}>
                      Stay online to receive new delivery requests
                    </Text>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Offline Message */}
            {!isOnline && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #ff6b6b" boxShadow="0 0 20px #ff6b6b40">
                  <CardBody textAlign="center" py={12}>
                    <Text color="#ff6b6b" fontSize="lg" fontWeight="bold">
                      You are currently offline
                    </Text>
                    <Text color="gray.400" fontSize="sm" mt={2}>
                      Turn on your online status to start receiving delivery requests
                    </Text>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </VStack>
        </motion.div>
      </Box>
    </Box>
  )
}

export default CourierDashboard
