"use client"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import useThemeStore from "../stores/themeStore"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const { getNeonColorClass } = useThemeStore()

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "uz", name: "O'zbek", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ]

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode)
  }

  return (
    <div className="relative group">
      <motion.button
        className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800/50 border border-gray-600 ${getNeonColorClass()} hover:border-current transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={16} />
        <span className="text-sm font-rajdhani">
          {languages.find((lang) => lang.code === i18n.language)?.name || "English"}
        </span>
      </motion.button>

      <motion.div
        className="absolute top-full right-0 mt-2 bg-dark-800 border border-gray-600 rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {languages.map((language) => (
          <motion.button
            key={language.code}
            className={`w-full px-4 py-2 text-left hover:bg-dark-700 ${getNeonColorClass()} hover:text-current transition-colors duration-200 flex items-center gap-3`}
            onClick={() => changeLanguage(language.code)}
            whileHover={{ x: 5 }}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="font-rajdhani">{language.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default LanguageSwitcher
