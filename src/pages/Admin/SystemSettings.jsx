"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Input,
  Switch,
  VStack,
  HStack,
  Grid,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
import { FaServer, FaDatabase, FaCog } from "react-icons/fa"
import ParticleBackground from "../../components/ParticleBackground"
import { apiService } from "../../services/api"

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    platform: {
      name: "NeonEats",
      description: "Premium Food Delivery Platform",
      maintenance_mode: false,
      allow_registrations: true,
      max_delivery_distance: 25,
      default_delivery_fee: 3.99,
      commission_rate: 15,
    },
    notifications: {
      email_enabled: true,
      sms_enabled: true,
      push_enabled: true,
      admin_alerts: true,
    },
    security: {
      password_min_length: 8,
      require_email_verification: true,
      session_timeout: 30,
      max_login_attempts: 5,
    },
    payment: {
      stripe_enabled: true,
      paypal_enabled: false,
      minimum_order: 10.0,
      processing_fee: 0.3,
    },
  })
  const [systemHealth, setSystemHealth] = useState({
    cpu_usage: 45,
    memory_usage: 62,
    disk_usage: 38,
    database_connections: 15,
    active_users: 1247,
    uptime: "15 days, 8 hours",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  useEffect(() => {
    fetchSettings()
    fetchSystemHealth()
    const interval = setInterval(fetchSystemHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await apiService.get("/admin/settings/")
      setSettings(response.data)
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSystemHealth = async () => {
    try {
      const response = await apiService.get("/admin/system/health/")
      setSystemHealth(response.data)
    } catch (error) {
      console.error("Error fetching system health:", error)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      await apiService.put("/admin/settings/", settings)
      toast({
        title: "Settings Saved",
        description: "System settings have been updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  const getHealthColor = (value) => {
    if (value < 50) return "green"
    if (value < 80) return "yellow"
    return "red"
  }

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.900" position="relative">
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
    <Box minH="100vh" bg="gray.900" position="relative">
      <ParticleBackground />

      <Box position="relative" zIndex={2} p={8}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <HStack justify="space-between" align="center">
              <Heading size="2xl" color="white" textShadow="0 0 20px #00ffff">
                System Settings
              </Heading>
              <Button
                colorScheme="cyan"
                size="lg"
                onClick={saveSettings}
                isLoading={saving}
                loadingText="Saving..."
                boxShadow="0 0 20px #00ffff40"
                _hover={{
                  boxShadow: "0 0 30px #00ffff60",
                  transform: "translateY(-2px)",
                }}
              >
                Save Changes
              </Button>
            </HStack>

            {/* System Health */}
            <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
              <CardBody>
                <Heading size="md" color="white" mb={4}>
                  System Health
                </Heading>
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                  <VStack spacing={3}>
                    <HStack>
                      <FaServer color="#00ffff" />
                      <Text color="white" fontWeight="bold">
                        CPU Usage
                      </Text>
                    </HStack>
                    <Progress
                      value={systemHealth.cpu_usage}
                      colorScheme={getHealthColor(systemHealth.cpu_usage)}
                      size="lg"
                      w="100%"
                      bg="gray.700"
                    />
                    <Text color="gray.300" fontSize="sm">
                      {systemHealth.cpu_usage}%
                    </Text>
                  </VStack>

                  <VStack spacing={3}>
                    <HStack>
                      <FaDatabase color="#ff6b6b" />
                      <Text color="white" fontWeight="bold">
                        Memory Usage
                      </Text>
                    </HStack>
                    <Progress
                      value={systemHealth.memory_usage}
                      colorScheme={getHealthColor(systemHealth.memory_usage)}
                      size="lg"
                      w="100%"
                      bg="gray.700"
                    />
                    <Text color="gray.300" fontSize="sm">
                      {systemHealth.memory_usage}%
                    </Text>
                  </VStack>

                  <VStack spacing={3}>
                    <HStack>
                      <FaCog color="#ffd93d" />
                      <Text color="white" fontWeight="bold">
                        Disk Usage
                      </Text>
                    </HStack>
                    <Progress
                      value={systemHealth.disk_usage}
                      colorScheme={getHealthColor(systemHealth.disk_usage)}
                      size="lg"
                      w="100%"
                      bg="gray.700"
                    />
                    <Text color="gray.300" fontSize="sm">
                      {systemHealth.disk_usage}%
                    </Text>
                  </VStack>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mt={6}>
                  <Stat>
                    <StatLabel color="gray.300">Active Users</StatLabel>
                    <StatNumber color="#6bcf7f">{systemHealth.active_users}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel color="gray.300">DB Connections</StatLabel>
                    <StatNumber color="#00ffff">{systemHealth.database_connections}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel color="gray.300">Uptime</StatLabel>
                    <StatNumber color="#ff6b6b" fontSize="lg">
                      {systemHealth.uptime}
                    </StatNumber>
                  </Stat>
                </Grid>
              </CardBody>
            </Card>

            {/* Settings Tabs */}
            <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
              <CardBody>
                <Tabs colorScheme="cyan">
                  <TabList>
                    <Tab color="white">Platform</Tab>
                    <Tab color="white">Security</Tab>
                    <Tab color="white">Notifications</Tab>
                    <Tab color="white">Payment</Tab>
                  </TabList>

                  <TabPanels>
                    {/* Platform Settings */}
                    <TabPanel>
                      <VStack spacing={6} align="stretch">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                          <FormControl>
                            <FormLabel color="white">Platform Name</FormLabel>
                            <Input
                              value={settings.platform.name}
                              onChange={(e) => updateSetting("platform", "name", e.target.value)}
                              bg="gray.700"
                              color="white"
                              border="1px solid #00ffff"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel color="white">Max Delivery Distance (km)</FormLabel>
                            <NumberInput
                              value={settings.platform.max_delivery_distance}
                              onChange={(value) =>
                                updateSetting("platform", "max_delivery_distance", Number.parseInt(value))
                              }
                              min={1}
                              max={100}
                            >
                              <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                              <NumberInputStepper>
                                <NumberIncrementStepper color="white" />
                                <NumberDecrementStepper color="white" />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </Grid>

                        <FormControl>
                          <FormLabel color="white">Platform Description</FormLabel>
                          <Textarea
                            value={settings.platform.description}
                            onChange={(e) => updateSetting("platform", "description", e.target.value)}
                            bg="gray.700"
                            color="white"
                            border="1px solid #00ffff"
                            rows={3}
                          />
                        </FormControl>

                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                          <FormControl>
                            <FormLabel color="white">Default Delivery Fee ($)</FormLabel>
                            <NumberInput
                              value={settings.platform.default_delivery_fee}
                              onChange={(value) =>
                                updateSetting("platform", "default_delivery_fee", Number.parseFloat(value))
                              }
                              min={0}
                              precision={2}
                              step={0.25}
                            >
                              <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                              <NumberInputStepper>
                                <NumberIncrementStepper color="white" />
                                <NumberDecrementStepper color="white" />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>

                          <FormControl>
                            <FormLabel color="white">Commission Rate (%)</FormLabel>
                            <NumberInput
                              value={settings.platform.commission_rate}
                              onChange={(value) => updateSetting("platform", "commission_rate", Number.parseInt(value))}
                              min={0}
                              max={50}
                            >
                              <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                              <NumberInputStepper>
                                <NumberIncrementStepper color="white" />
                                <NumberDecrementStepper color="white" />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </Grid>

                        <VStack spacing={4} align="stretch">
                          <FormControl display="flex" alignItems="center">
                            <FormLabel color="white" mb="0" flex="1">
                              Maintenance Mode
                            </FormLabel>
                            <Switch
                              isChecked={settings.platform.maintenance_mode}
                              onChange={(e) => updateSetting("platform", "maintenance_mode", e.target.checked)}
                              colorScheme="red"
                            />
                          </FormControl>

                          <FormControl display="flex" alignItems="center">
                            <FormLabel color="white" mb="0" flex="1">
                              Allow New Registrations
                            </FormLabel>
                            <Switch
                              isChecked={settings.platform.allow_registrations}
                              onChange={(e) => updateSetting("platform", "allow_registrations", e.target.checked)}
                              colorScheme="cyan"
                            />
                          </FormControl>
                        </VStack>
                      </VStack>
                    </TabPanel>

                    {/* Security Settings */}
                    <TabPanel>
                      <VStack spacing={6} align="stretch">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                          <FormControl>
                            <FormLabel color="white">Minimum Password Length</FormLabel>
                            <NumberInput
                              value={settings.security.password_min_length}
                              onChange={(value) =>
                                updateSetting("security", "password_min_length", Number.parseInt(value))
                              }
                              min={6}
                              max={20}
                            >
                              <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                              <NumberInputStepper>
                                <NumberIncrementStepper color="white" />
                                <NumberDecrementStepper color="white" />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>

                          <FormControl>
                            <FormLabel color="white">Session Timeout (minutes)</FormLabel>
                            <NumberInput
                              value={settings.security.session_timeout}
                              onChange={(value) => updateSetting("security", "session_timeout", Number.parseInt(value))}
                              min={5}
                              max={120}
                            >
                              <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                              <NumberInputStepper>
                                <NumberIncrementStepper color="white" />
                                <NumberDecrementStepper color="white" />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </Grid>

                        <FormControl>
                          <FormLabel color="white">Max Login Attempts</FormLabel>
                          <NumberInput
                            value={settings.security.max_login_attempts}
                            onChange={(value) =>
                              updateSetting("security", "max_login_attempts", Number.parseInt(value))
                            }
                            min={3}
                            max={10}
                          >
                            <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                            <NumberInputStepper>
                              <NumberIncrementStepper color="white" />
                              <NumberDecrementStepper color="white" />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                          <FormLabel color="white" mb="0" flex="1">
                            Require Email Verification
                          </FormLabel>
                          <Switch
                            isChecked={settings.security.require_email_verification}
                            onChange={(e) => updateSetting("security", "require_email_verification", e.target.checked)}
                            colorScheme="cyan"
                          />
                        </FormControl>
                      </VStack>
                    </TabPanel>

                    {/* Notifications Settings */}
                    <TabPanel>
                      <VStack spacing={6} align="stretch">
                        <FormControl display="flex" alignItems="center">
                          <FormLabel color="white" mb="0" flex="1">
                            Email Notifications
                          </FormLabel>
                          <Switch
                            isChecked={settings.notifications.email_enabled}
                            onChange={(e) => updateSetting("notifications", "email_enabled", e.target.checked)}
                            colorScheme="cyan"
                          />
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                          <FormLabel color="white" mb="0" flex="1">
                            SMS Notifications
                          </FormLabel>
                          <Switch
                            isChecked={settings.notifications.sms_enabled}
                            onChange={(e) => updateSetting("notifications", "sms_enabled", e.target.checked)}
                            colorScheme="cyan"
                          />
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                          <FormLabel color="white" mb="0" flex="1">
                            Push Notifications
                          </FormLabel>
                          <Switch
                            isChecked={settings.notifications.push_enabled}
                            onChange={(e) => updateSetting("notifications", "push_enabled", e.target.checked)}
                            colorScheme="cyan"
                          />
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                          <FormLabel color="white" mb="0" flex="1">
                            Admin Alerts
                          </FormLabel>
                          <Switch
                            isChecked={settings.notifications.admin_alerts}
                            onChange={(e) => updateSetting("notifications", "admin_alerts", e.target.checked)}
                            colorScheme="cyan"
                          />
                        </FormControl>
                      </VStack>
                    </TabPanel>

                    {/* Payment Settings */}
                    <TabPanel>
                      <VStack spacing={6} align="stretch">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                          <FormControl>
                            <FormLabel color="white">Minimum Order Amount ($)</FormLabel>
                            <NumberInput
                              value={settings.payment.minimum_order}
                              onChange={(value) => updateSetting("payment", "minimum_order", Number.parseFloat(value))}
                              min={0}
                              precision={2}
                              step={0.5}
                            >
                              <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                              <NumberInputStepper>
                                <NumberIncrementStepper color="white" />
                                <NumberDecrementStepper color="white" />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>

                          <FormControl>
                            <FormLabel color="white">Processing Fee ($)</FormLabel>
                            <NumberInput
                              value={settings.payment.processing_fee}
                              onChange={(value) => updateSetting("payment", "processing_fee", Number.parseFloat(value))}
                              min={0}
                              precision={2}
                              step={0.05}
                            >
                              <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                              <NumberInputStepper>
                                <NumberIncrementStepper color="white" />
                                <NumberDecrementStepper color="white" />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </Grid>

                        <VStack spacing={4} align="stretch">
                          <FormControl display="flex" alignItems="center">
                            <FormLabel color="white" mb="0" flex="1">
                              Stripe Payments
                            </FormLabel>
                            <Switch
                              isChecked={settings.payment.stripe_enabled}
                              onChange={(e) => updateSetting("payment", "stripe_enabled", e.target.checked)}
                              colorScheme="cyan"
                            />
                          </FormControl>

                          <FormControl display="flex" alignItems="center">
                            <FormLabel color="white" mb="0" flex="1">
                              PayPal Payments
                            </FormLabel>
                            <Switch
                              isChecked={settings.payment.paypal_enabled}
                              onChange={(e) => updateSetting("payment", "paypal_enabled", e.target.checked)}
                              colorScheme="cyan"
                            />
                          </FormControl>
                        </VStack>
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  )
}

export default SystemSettings
