"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Input,
  Select,
  VStack,
  HStack,
  Badge,
  Avatar,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react"
import { FaTrash, FaBan, FaCheck, FaEye, FaSearch } from "react-icons/fa"
import ParticleBackground from "../../components/ParticleBackground"
import { apiService } from "../../services/api"

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, userTypeFilter, statusFilter])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await apiService.get("/admin/users/")
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to load users",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm),
      )
    }

    if (userTypeFilter !== "all") {
      filtered = filtered.filter((user) => user.user_type === userTypeFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => (statusFilter === "active" ? user.is_active : !user.is_active))
    }

    setFilteredUsers(filtered)
  }

  const handleUserAction = async (userId, action) => {
    try {
      await apiService.post(`/admin/users/${userId}/${action}/`)
      toast({
        title: "Success",
        description: `User ${action} successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      fetchUsers()
    } catch (error) {
      console.error(`Error ${action} user:`, error)
      toast({
        title: "Error",
        description: `Failed to ${action} user`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const viewUserDetails = (user) => {
    setSelectedUser(user)
    onOpen()
  }

  const getUserTypeColor = (type) => {
    switch (type) {
      case "customer":
        return "blue"
      case "restaurant_owner":
        return "purple"
      case "courier":
        return "orange"
      case "admin":
        return "red"
      default:
        return "gray"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
            <Heading size="2xl" color="white" textAlign="center" textShadow="0 0 20px #00ffff">
              User Management
            </Heading>

            {/* Filters */}
            <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 20px #00ffff40">
              <CardBody>
                <HStack spacing={4} wrap="wrap">
                  <HStack flex="1" minW="300px">
                    <FaSearch color="#00ffff" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      bg="gray.700"
                      color="white"
                      border="1px solid #00ffff"
                    />
                  </HStack>
                  <Select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    bg="gray.700"
                    color="white"
                    border="1px solid #00ffff"
                    w="200px"
                  >
                    <option value="all">All Types</option>
                    <option value="customer">Customers</option>
                    <option value="restaurant_owner">Restaurant Owners</option>
                    <option value="courier">Couriers</option>
                    <option value="admin">Admins</option>
                  </Select>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    bg="gray.700"
                    color="white"
                    border="1px solid #00ffff"
                    w="150px"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <Button
                    colorScheme="cyan"
                    onClick={() => {
                      setSearchTerm("")
                      setUserTypeFilter("all")
                      setStatusFilter("all")
                    }}
                  >
                    Clear
                  </Button>
                </HStack>
              </CardBody>
            </Card>

            {/* Users Table */}
            <Card bg="rgba(0, 0, 0, 0.8)" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
              <CardBody>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th color="white" borderColor="gray.600">
                          User
                        </Th>
                        <Th color="white" borderColor="gray.600">
                          Type
                        </Th>
                        <Th color="white" borderColor="gray.600">
                          Status
                        </Th>
                        <Th color="white" borderColor="gray.600">
                          Joined
                        </Th>
                        <Th color="white" borderColor="gray.600">
                          Last Active
                        </Th>
                        <Th color="white" borderColor="gray.600">
                          Actions
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <AnimatePresence>
                        {filteredUsers.map((user, index) => (
                          <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Td borderColor="gray.600">
                              <HStack>
                                <Avatar size="sm" name={`${user.first_name} ${user.last_name}`} src={user.avatar} />
                                <VStack align="start" spacing={0}>
                                  <Text color="white" fontWeight="medium">
                                    {user.first_name} {user.last_name}
                                  </Text>
                                  <Text color="gray.400" fontSize="sm">
                                    {user.email}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Td>
                            <Td borderColor="gray.600">
                              <Badge colorScheme={getUserTypeColor(user.user_type)}>
                                {user.user_type.replace("_", " ")}
                              </Badge>
                            </Td>
                            <Td borderColor="gray.600">
                              <Badge colorScheme={user.is_active ? "green" : "red"}>
                                {user.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </Td>
                            <Td borderColor="gray.600" color="gray.300">
                              {formatDate(user.date_joined)}
                            </Td>
                            <Td borderColor="gray.600" color="gray.300">
                              {user.last_login ? formatDate(user.last_login) : "Never"}
                            </Td>
                            <Td borderColor="gray.600">
                              <HStack spacing={2}>
                                <IconButton
                                  icon={<FaEye />}
                                  size="sm"
                                  colorScheme="blue"
                                  onClick={() => viewUserDetails(user)}
                                  aria-label="View user"
                                />
                                <IconButton
                                  icon={user.is_active ? <FaBan /> : <FaCheck />}
                                  size="sm"
                                  colorScheme={user.is_active ? "red" : "green"}
                                  onClick={() => handleUserAction(user.id, user.is_active ? "deactivate" : "activate")}
                                  aria-label={user.is_active ? "Deactivate" : "Activate"}
                                />
                                <IconButton
                                  icon={<FaTrash />}
                                  size="sm"
                                  colorScheme="red"
                                  onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this user?")) {
                                      handleUserAction(user.id, "delete")
                                    }
                                  }}
                                  aria-label="Delete user"
                                />
                              </HStack>
                            </Td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </Tbody>
                  </Table>
                </TableContainer>

                {filteredUsers.length === 0 && (
                  <Box textAlign="center" py={8}>
                    <Text color="gray.400" fontSize="lg">
                      No users found
                    </Text>
                    <Text color="gray.500" fontSize="sm" mt={2}>
                      Try adjusting your filters or search terms
                    </Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </VStack>
        </motion.div>
      </Box>

      {/* User Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="gray.800" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
          <ModalHeader color="white">User Details</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {selectedUser && (
              <Tabs colorScheme="cyan">
                <TabList>
                  <Tab color="white">Profile</Tab>
                  <Tab color="white">Activity</Tab>
                  <Tab color="white">Settings</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <HStack>
                        <Avatar
                          size="lg"
                          name={`${selectedUser.first_name} ${selectedUser.last_name}`}
                          src={selectedUser.avatar}
                        />
                        <VStack align="start" spacing={1}>
                          <Text color="white" fontSize="xl" fontWeight="bold">
                            {selectedUser.first_name} {selectedUser.last_name}
                          </Text>
                          <Text color="gray.300">{selectedUser.email}</Text>
                          <Badge colorScheme={getUserTypeColor(selectedUser.user_type)}>
                            {selectedUser.user_type.replace("_", " ")}
                          </Badge>
                        </VStack>
                      </HStack>

                      <VStack spacing={3} align="stretch">
                        <HStack justify="space-between">
                          <Text color="gray.300">Phone:</Text>
                          <Text color="white">{selectedUser.phone || "Not provided"}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.300">Address:</Text>
                          <Text color="white">{selectedUser.address || "Not provided"}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.300">Date Joined:</Text>
                          <Text color="white">{formatDate(selectedUser.date_joined)}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.300">Last Login:</Text>
                          <Text color="white">
                            {selectedUser.last_login ? formatDate(selectedUser.last_login) : "Never"}
                          </Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="gray.300">Email Verified:</Text>
                          <Badge colorScheme={selectedUser.email_verified ? "green" : "red"}>
                            {selectedUser.email_verified ? "Verified" : "Not Verified"}
                          </Badge>
                        </HStack>
                      </VStack>
                    </VStack>
                  </TabPanel>

                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <Text color="white" fontWeight="bold">
                        Recent Activity
                      </Text>
                      <VStack spacing={3} align="stretch">
                        {selectedUser.recent_activity?.map((activity, index) => (
                          <HStack key={index} p={3} bg="rgba(255, 255, 255, 0.05)" borderRadius="md">
                            <VStack align="start" spacing={0} flex="1">
                              <Text color="white" fontSize="sm">
                                {activity.action}
                              </Text>
                              <Text color="gray.400" fontSize="xs">
                                {activity.timestamp}
                              </Text>
                            </VStack>
                          </HStack>
                        )) || (
                          <Text color="gray.400" textAlign="center">
                            No recent activity
                          </Text>
                        )}
                      </VStack>
                    </VStack>
                  </TabPanel>

                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel color="white" mb="0" flex="1">
                          Account Active
                        </FormLabel>
                        <Switch
                          isChecked={selectedUser.is_active}
                          onChange={(e) => {
                            handleUserAction(selectedUser.id, e.target.checked ? "activate" : "deactivate")
                            setSelectedUser({ ...selectedUser, is_active: e.target.checked })
                          }}
                          colorScheme="cyan"
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel color="white" mb="0" flex="1">
                          Email Notifications
                        </FormLabel>
                        <Switch isChecked={selectedUser.email_notifications} colorScheme="cyan" />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel color="white" mb="0" flex="1">
                          SMS Notifications
                        </FormLabel>
                        <Switch isChecked={selectedUser.sms_notifications} colorScheme="cyan" />
                      </FormControl>

                      <FormControl>
                        <FormLabel color="white">Admin Notes</FormLabel>
                        <Textarea
                          value={selectedUser.admin_notes || ""}
                          bg="gray.700"
                          color="white"
                          border="1px solid #00ffff"
                          placeholder="Add notes about this user..."
                          rows={4}
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default UserManagement
