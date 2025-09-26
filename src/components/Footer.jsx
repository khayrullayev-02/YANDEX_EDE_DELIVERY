"use client"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import useThemeStore from "../stores/themeStore"

const Footer = () => {
  const { t } = useTranslation()
  const { getNeonColorClass } = useThemeStore()

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  const quickLinks = [
    { name: t("home"), href: "/" },
    { name: t("restaurants"), href: "/restaurants" },
    { name: t("orders"), href: "/orders" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <footer className="bg-dark-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              className={`text-3xl font-orbitron font-bold ${getNeonColorClass()}`}
              whileHover={{ scale: 1.05 }}
              style={{ textShadow: "0 0 20px currentColor" }}
            >
              NeonFood
            </motion.div>
            <p className="text-gray-400 font-rajdhani">
              Futuristic food delivery platform bringing the best restaurants to your doorstep with neon-speed delivery.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`p-2 rounded-lg ${getNeonColorClass()} hover:bg-current/10 transition-colors duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-orbitron font-bold ${getNeonColorClass()}`}>Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white font-rajdhani transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className={`text-lg font-orbitron font-bold ${getNeonColorClass()}`}>Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={16} className={getNeonColorClass()} />
                <span className="font-rajdhani">+998 90 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={16} className={getNeonColorClass()} />
                <span className="font-rajdhani">info@neonfood.uz</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={16} className={getNeonColorClass()} />
                <span className="font-rajdhani">Tashkent, Uzbekistan</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className={`text-lg font-orbitron font-bold ${getNeonColorClass()}`}>Newsletter</h3>
            <p className="text-gray-400 font-rajdhani text-sm">
              Subscribe to get updates on new restaurants and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-dark-800 border border-gray-600 rounded-l-lg focus:outline-none focus:border-current text-white font-rajdhani"
              />
              <motion.button
                className={`px-4 py-2 ${getNeonColorClass()} border border-current rounded-r-lg hover:bg-current hover:text-black transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-rajdhani text-sm">© 2025 NeonFood. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white font-rajdhani text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white font-rajdhani text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
