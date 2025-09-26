import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import useThemeStore from "./stores/themeStore"

// Layout Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import OrderTracking from "./pages/OrderTracking"
import RestaurantDashboard from "./pages/RestaurantDashboard"

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  // Add authentication logic here if needed
  return children
}

function App() {
  const { isDarkMode } = useThemeStore()

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Router>
        <div className="min-h-screen bg-dark-900 text-white">
          <Navbar />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer Routes */}
            <Route path="/restaurants" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Home />} />
            <Route path="/order/:orderId" element={<OrderTracking />} />
            <Route path="/profile" element={<Home />} />

            {/* Restaurant Owner Routes */}
            <Route
              path="/restaurant/dashboard"
              element={
                <ProtectedRoute requiredRole="restaurant">
                  <RestaurantDashboard />
                </ProtectedRoute>
              }
            />

            {/* Courier Routes */}
            <Route path="/courier/dashboard" element={<Home />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Home />} />

            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>

          <Footer />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: isDarkMode ? "#1f2937" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
                border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                borderRadius: "12px",
                fontFamily: "Rajdhani, sans-serif",
              },
              success: {
                iconTheme: {
                  primary: "#00f5ff",
                  secondary: "#000000",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </div>
      </Router>
    </div>
  )
}

export default App
