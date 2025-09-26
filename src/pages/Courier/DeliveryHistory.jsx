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
  Badge,
  Input,
  Select,
  Grid,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react"
import { FaCalendarAlt, FaMapMarkerAlt, FaStar } from "react-icons/fa"
import ParticleBackground from "../../components/ParticleBackground"
import { apiService } from "../../services/api"

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState([])
  const [filteredDeliveries, setFilteredDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    totalEarnings: 0,
    averageRating: 0,
    completionRate: 0,
  })

  const bgColor = useColorModeValue("gray.50", "gray.900")

  useEffect(() => {
    fetchDeliveryHistory()
  }, [])

  useEffect(() => {
    filterDeliveries()
  }, [deliveries, searchTerm, statusFilter, dateFilter])

  const fetchDeliveryHistory = async () => {
    try {
      setLoading(true)
      const [deliveriesResponse, statsResponse] = await Promise.all([
        apiService.get("/courier/deliveries/history/"),
        apiService.get("/courier/deliveries/stats/"),
      ])

      setDeliveries(deliveriesResponse.data)
      setStats(statsResponse.data)
    } catch (error) {
      console.error("Error fetching delivery history:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterDeliveries = () => {
    let filtered = deliveries

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (delivery) =>
          delivery.order_id.toString().includes(searchTerm) ||
          delivery.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          delivery.delivery_address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((delivery) => delivery.status === statusFilter)
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date()
      const filterDate = new Date()

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0)
          break
        case "week":
          filterDate.setDate(now.getDate() - 7)
          break
        case "month":
          filterDate.setMonth(now.getMonth() - 1)
          break
        default:
          break
      }

      if (dateFilter !== "all") {
        filtered = filtered.filter((delivery) => new Date(delivery.completed_at) >= filterDate)
      }
    }

    setFilteredDeliveries(filtered)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "green"
      case "cancelled":
        return "red"
      case "in_transit":
        return "yellow"
      case "picked_up":
        return "blue"
      default:
        return "gray"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
              Delivery History
            </Heading>

            {/* Stats */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
              {[
                { label: "Total Deliveries", value: stats.totalDeliveries, color: "#00ffff" },
                { label: "Total Earnings", value: `$${stats.totalEarnings}`, color: "#ff6b6b" },
                { label: "Average Rating", value: stats.averageRating.toFixed(1), color: "#ffd93d" },
                { label: "Completion Rate", value: `${stats.completionRate}%`, color: "#6bcf7f" },
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
                  >
                    <CardBody>
                      <Stat>
                        <StatLabel color="gray.300" fontSize="sm">
                          {stat.label}
                        </StatLabel>
                        <StatNumber color={stat.color} fontSize="2xl" textShadow={`0 0 10px ${stat.color}`}>
                          {stat.value}
                        </StatNumber>
                      </Stat>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </Grid>

            {/* Filters */}
            <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 20px #00ffff40">
              <CardBody>
                <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    bg="gray.700"
                    color="white"
                    border="1px solid #00ffff"
                  />
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    bg="gray.700"
                    color="white"
                    border="1px solid #00ffff"
                  >
                    <option value="all">All Status</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="in_transit">In Transit</option>
                  </Select>
                  <Select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    bg="gray.700"
                    color="white"
                    border="1px solid #00ffff"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </Select>
                  <Button
                    colorScheme="cyan"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setDateFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </CardBody>
            </Card>

            {/* Delivery List */}
            <VStack spacing={4} align="stretch">
              {filteredDeliveries.map((delivery, index) => (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card
                    bg="rgba(0, 0, 0, 0.8)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    boxShadow="0 0 15px rgba(0, 255, 255, 0.2)"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 25px rgba(0, 255, 255, 0.3)",
                    }}
                    transition="all 0.3s ease"
                  >
                    <CardBody>
                      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }} gap={4}>
                        <VStack align="start" spacing={2}>
                          <HStack>
                            <Text color="white" fontWeight="bold">
                              Order #{delivery.order_id}
                            </Text>
                            <Badge colorScheme={getStatusColor(delivery.status)}>
                              {delivery.status.replace("_", " ")}
                            </Badge>
                          </HStack>
                          <Text color="gray.300" fontSize="sm">
                            {delivery.restaurant_name}
                          </Text>
                          <HStack color="gray.400" fontSize="sm">
                            <FaMapMarkerAlt />
                            <Text>{delivery.delivery_address}</Text>
                          </HStack>
                        </VStack>

                        <VStack align="center" spacing={1}>
                          <Text color="#00ffff" fontWeight="bold">
                            ${delivery.delivery_fee}
                          </Text>
                          <Text color="gray.400" fontSize="sm">
                            {delivery.distance} km
                          </Text>
                        </VStack>

                        <VStack align="center" spacing={1}>
                          <HStack color="#ffd93d">
                            <FaStar />
                            <Text fontWeight="bold">{delivery.rating || "N/A"}</Text>
                          </HStack>
                          <Text color="gray.400" fontSize="sm">
                            Rating
                          </Text>
                        </VStack>

                        <VStack align="end" spacing={1}>
                          <HStack color="gray.400" fontSize="sm">
                            <FaCalendarAlt />
                            <Text>{formatDate(delivery.completed_at)}</Text>
                          </HStack>
                          <Text color="gray.500" fontSize="xs">
                            {delivery.duration} min
                          </Text>
                        </VStack>
                      </Grid>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </VStack>

            {filteredDeliveries.length === 0 && (
              <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #666" boxShadow="0 0 20px #66666640">
                <CardBody textAlign="center" py={12}>
                  <Text color="gray.400" fontSize="lg">
                    No deliveries found
                  </Text>
                  <Text color="gray.500" fontSize="sm" mt={2}>
                    Try adjusting your filters or search terms
                  </Text>
                </CardBody>
              </Card>
            )}
          </VStack>
        </motion.div>
      </Box>
    </Box>
  )
}

export default DeliveryHistory
