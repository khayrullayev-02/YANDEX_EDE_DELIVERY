"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ShoppingCart, User, Home, Store, Package } from "lucide-react"
import useAuthStore from "../stores/authStore"
import useCartStore from "../stores/cartStore"
import useThemeStore from "../stores/themeStore"
import LanguageSwitcher from "./LanguageSwitcher"
import ThemeToggle from "./ThemeToggle"
import NeonButton from "./NeonButton"

const Navbar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { isAuthenticated, user, logout } = useAuthStore()
  const { getItemCount } = useCartStore()
  const { getNeonColorClass } = useThemeStore()

  const navigation = [
    { name: t("home"), href: "/", icon: Home },
    { name: t("restaurants"), href: "/restaurants", icon: Store },
    { name: t("orders"), href: "/orders", icon: Package },
  ]

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className={`text-2xl font-orbitron font-bold ${getNeonColorClass()}`}
              whileHover={{ scale: 1.05 }}
              style={{ textShadow: "0 0 20px currentColor" }}
            >
              NeonFood
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? `${getNeonColorClass()} bg-current/10` : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-rajdhani">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Cart */}
            <Link to="/cart" className="relative">
              <motion.div
                className={`p-2 rounded-lg ${getNeonColorClass()} hover:bg-current/10 transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={20} />
                {getItemCount() > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-neon-pink text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {getItemCount()}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className={`flex items-center space-x-2 ${getNeonColorClass()}`}>
                  <User size={18} />
                  <span className="font-rajdhani">{user?.firstName || "Profile"}</span>
                </Link>
                <NeonButton variant="ghost" size="sm" onClick={handleLogout}>
                  {t("logout")}
                </NeonButton>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <NeonButton variant="ghost" size="sm">
                    {t("login")}
                  </NeonButton>
                </Link>
                <Link to="/register">
                  <NeonButton variant="primary" size="sm">
                    {t("register")}
                  </NeonButton>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              className={`p-2 rounded-lg ${getNeonColorClass()}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-dark-800/95 backdrop-blur-md border-t border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive ? `${getNeonColorClass()} bg-current/10` : "text-gray-300"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="font-rajdhani text-lg">{item.name}</span>
                  </Link>
                )
              })}

              <div className="border-t border-gray-700 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>

                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link
                      to="/profile"
                      className={`flex items-center space-x-3 px-3 py-2 ${getNeonColorClass()}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} />
                      <span className="font-rajdhani text-lg">{user?.firstName || "Profile"}</span>
                    </Link>
                    <NeonButton variant="ghost" size="sm" onClick={handleLogout} className="w-full">
                      {t("logout")}
                    </NeonButton>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <NeonButton variant="ghost" size="sm" className="w-full">
                        {t("login")}
                      </NeonButton>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <NeonButton variant="primary" size="sm" className="w-full">
                        {t("register")}
                      </NeonButton>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
