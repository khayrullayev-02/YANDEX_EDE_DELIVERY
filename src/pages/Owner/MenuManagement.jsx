"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Box,
  Grid,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Switch,
  VStack,
  HStack,
  Image,
  Badge,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"
import ParticleBackground from "../../components/ParticleBackground"
import { apiService } from "../../services/api"

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    is_available: true,
    preparation_time: 15,
    ingredients: "",
    allergens: "",
    calories: 0,
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: false,
  })

  useEffect(() => {
    fetchMenuData()
  }, [])

  const fetchMenuData = async () => {
    try {
      setLoading(true)
      const [itemsResponse, categoriesResponse] = await Promise.all([
        apiService.get("/owner/menu/items/"),
        apiService.get("/owner/menu/categories/"),
      ])

      setMenuItems(itemsResponse.data)
      setCategories(categoriesResponse.data)
    } catch (error) {
      console.error("Error fetching menu data:", error)
      toast({
        title: "Error",
        description: "Failed to load menu data",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItem) {
        await apiService.put(`/owner/menu/items/${editingItem.id}/`, formData)
        toast({
          title: "Success",
          description: "Menu item updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      } else {
        await apiService.post("/owner/menu/items/", formData)
        toast({
          title: "Success",
          description: "Menu item created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }

      fetchMenuData()
      onClose()
      resetForm()
    } catch (error) {
      console.error("Error saving menu item:", error)
      toast({
        title: "Error",
        description: "Failed to save menu item",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      is_available: item.is_available,
      preparation_time: item.preparation_time,
      ingredients: item.ingredients,
      allergens: item.allergens,
      calories: item.calories,
      is_vegetarian: item.is_vegetarian,
      is_vegan: item.is_vegan,
      is_gluten_free: item.is_gluten_free,
    })
    onOpen()
  }

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await apiService.delete(`/owner/menu/items/${itemId}/`)
        toast({
          title: "Success",
          description: "Menu item deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        fetchMenuData()
      } catch (error) {
        console.error("Error deleting menu item:", error)
        toast({
          title: "Error",
          description: "Failed to delete menu item",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      is_available: true,
      preparation_time: 15,
      ingredients: "",
      allergens: "",
      calories: 0,
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
    })
    setEditingItem(null)
  }

  const filteredItems =
    selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

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
                Menu Management
              </Heading>
              <Button
                leftIcon={<FaPlus />}
                colorScheme="cyan"
                size="lg"
                onClick={() => {
                  resetForm()
                  onOpen()
                }}
                boxShadow="0 0 20px #00ffff40"
                _hover={{
                  boxShadow: "0 0 30px #00ffff60",
                  transform: "translateY(-2px)",
                }}
              >
                Add New Item
              </Button>
            </HStack>

            {/* Category Filter */}
            <HStack spacing={4} wrap="wrap">
              <Button
                variant={selectedCategory === "all" ? "solid" : "outline"}
                colorScheme="cyan"
                onClick={() => setSelectedCategory("all")}
                size="sm"
              >
                All Items
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name ? "solid" : "outline"}
                  colorScheme="cyan"
                  onClick={() => setSelectedCategory(category.name)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </HStack>

            {/* Menu Items Grid */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <Card
                      bg="rgba(0, 0, 0, 0.8)"
                      border="1px solid"
                      borderColor={item.is_available ? "#00ffff" : "#666"}
                      boxShadow={`0 0 20px ${item.is_available ? "#00ffff40" : "#66666640"}`}
                      _hover={{
                        transform: "translateY(-5px)",
                        boxShadow: `0 10px 30px ${item.is_available ? "#00ffff60" : "#66666660"}`,
                      }}
                      transition="all 0.3s ease"
                      opacity={item.is_available ? 1 : 0.6}
                    >
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          {/* Item Image */}
                          <Box position="relative">
                            <Image
                              src={item.image || "/placeholder.svg?height=200&width=300"}
                              alt={item.name}
                              borderRadius="lg"
                              h="200px"
                              w="100%"
                              objectFit="cover"
                            />
                            {!item.is_available && (
                              <Badge position="absolute" top={2} right={2} colorScheme="red" variant="solid">
                                Unavailable
                              </Badge>
                            )}
                          </Box>

                          {/* Item Info */}
                          <VStack align="start" spacing={2}>
                            <Heading size="md" color="white">
                              {item.name}
                            </Heading>
                            <Text color="gray.300" fontSize="sm" noOfLines={2}>
                              {item.description}
                            </Text>
                            <HStack justify="space-between" w="100%">
                              <Text color="#00ffff" fontSize="xl" fontWeight="bold">
                                ${item.price}
                              </Text>
                              <Text color="gray.400" fontSize="sm">
                                {item.preparation_time} min
                              </Text>
                            </HStack>

                            {/* Dietary Badges */}
                            <HStack spacing={2} wrap="wrap">
                              {item.is_vegetarian && (
                                <Badge colorScheme="green" size="sm">
                                  Vegetarian
                                </Badge>
                              )}
                              {item.is_vegan && (
                                <Badge colorScheme="green" size="sm">
                                  Vegan
                                </Badge>
                              )}
                              {item.is_gluten_free && (
                                <Badge colorScheme="blue" size="sm">
                                  Gluten Free
                                </Badge>
                              )}
                            </HStack>
                          </VStack>

                          {/* Action Buttons */}
                          <HStack justify="space-between">
                            <IconButton
                              icon={<FaEdit />}
                              colorScheme="blue"
                              size="sm"
                              onClick={() => handleEdit(item)}
                              aria-label="Edit item"
                            />
                            <IconButton
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                              aria-label="Delete item"
                            />
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Grid>
          </VStack>
        </motion.div>
      </Box>

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="gray.800" border="1px solid #00ffff" boxShadow="0 0 30px #00ffff40">
          <ModalHeader color="white">{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <Tabs colorScheme="cyan">
                <TabList>
                  <Tab color="white">Basic Info</Tab>
                  <Tab color="white">Details</Tab>
                  <Tab color="white">Dietary</Tab>
                </TabList>

                <TabPanels>
                  {/* Basic Info Tab */}
                  <TabPanel>
                    <VStack spacing={4}>
                      <FormControl isRequired>
                        <FormLabel color="white">Name</FormLabel>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          bg="gray.700"
                          color="white"
                          border="1px solid #00ffff"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel color="white">Description</FormLabel>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          bg="gray.700"
                          color="white"
                          border="1px solid #00ffff"
                          rows={3}
                        />
                      </FormControl>

                      <HStack spacing={4} w="100%">
                        <FormControl isRequired>
                          <FormLabel color="white">Price ($)</FormLabel>
                          <NumberInput
                            value={formData.price}
                            onChange={(value) => setFormData({ ...formData, price: Number.parseFloat(value) || 0 })}
                            min={0}
                            precision={2}
                          >
                            <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                            <NumberInputStepper>
                              <NumberIncrementStepper color="white" />
                              <NumberDecrementStepper color="white" />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel color="white">Category</FormLabel>
                          <Select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            bg="gray.700"
                            color="white"
                            border="1px solid #00ffff"
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </HStack>

                      <FormControl>
                        <FormLabel color="white">Image URL</FormLabel>
                        <Input
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          bg="gray.700"
                          color="white"
                          border="1px solid #00ffff"
                          placeholder="https://example.com/image.jpg"
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>

                  {/* Details Tab */}
                  <TabPanel>
                    <VStack spacing={4}>
                      <HStack spacing={4} w="100%">
                        <FormControl>
                          <FormLabel color="white">Preparation Time (min)</FormLabel>
                          <NumberInput
                            value={formData.preparation_time}
                            onChange={(value) =>
                              setFormData({ ...formData, preparation_time: Number.parseInt(value) || 15 })
                            }
                            min={1}
                            max={120}
                          >
                            <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                            <NumberInputStepper>
                              <NumberIncrementStepper color="white" />
                              <NumberDecrementStepper color="white" />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>

                        <FormControl>
                          <FormLabel color="white">Calories</FormLabel>
                          <NumberInput
                            value={formData.calories}
                            onChange={(value) => setFormData({ ...formData, calories: Number.parseInt(value) || 0 })}
                            min={0}
                          >
                            <NumberInputField bg="gray.700" color="white" border="1px solid #00ffff" />
                            <NumberInputStepper>
                              <NumberIncrementStepper color="white" />
                              <NumberDecrementStepper color="white" />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </HStack>

                      <FormControl>
                        <FormLabel color="white">Ingredients</FormLabel>
                        <Textarea
                          value={formData.ingredients}
                          onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                          bg="gray.700"
                          color="white"
                          border="1px solid #00ffff"
                          placeholder="List main ingredients separated by commas"
                          rows={3}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel color="white">Allergens</FormLabel>
                        <Textarea
                          value={formData.allergens}
                          onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                          bg="gray.700"
                          color="white"
                          border="1px solid #00ffff"
                          placeholder="List allergens separated by commas"
                          rows={2}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel color="white" mb="0">
                          Available for Order
                        </FormLabel>
                        <Switch
                          isChecked={formData.is_available}
                          onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                          colorScheme="cyan"
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>

                  {/* Dietary Tab */}
                  <TabPanel>
                    <VStack spacing={6}>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel color="white" mb="0" flex="1">
                          Vegetarian
                        </FormLabel>
                        <Switch
                          isChecked={formData.is_vegetarian}
                          onChange={(e) => setFormData({ ...formData, is_vegetarian: e.target.checked })}
                          colorScheme="green"
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel color="white" mb="0" flex="1">
                          Vegan
                        </FormLabel>
                        <Switch
                          isChecked={formData.is_vegan}
                          onChange={(e) => setFormData({ ...formData, is_vegan: e.target.checked })}
                          colorScheme="green"
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel color="white" mb="0" flex="1">
                          Gluten Free
                        </FormLabel>
                        <Switch
                          isChecked={formData.is_gluten_free}
                          onChange={(e) => setFormData({ ...formData, is_gluten_free: e.target.checked })}
                          colorScheme="blue"
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <HStack justify="flex-end" mt={6} spacing={4}>
                <Button onClick={onClose} variant="outline" colorScheme="gray">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="cyan"
                  boxShadow="0 0 20px #00ffff40"
                  _hover={{
                    boxShadow: "0 0 30px #00ffff60",
                  }}
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default MenuManagement
