import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      restaurants: "Restaurants",
      orders: "Orders",
      profile: "Profile",
      login: "Login",
      register: "Register",
      logout: "Logout",

      // Auth
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone Number",
      address: "Address",
      signIn: "Sign In",
      signUp: "Sign Up",
      forgotPassword: "Forgot Password?",

      // Food Delivery
      orderNow: "Order Now",
      addToCart: "Add to Cart",
      viewCart: "View Cart",
      checkout: "Checkout",
      totalPrice: "Total Price",
      deliveryFee: "Delivery Fee",
      searchFood: "Search for food...",
      categories: "Categories",
      popular: "Popular",
      nearbyRestaurants: "Nearby Restaurants",

      // Dashboard
      dashboard: "Dashboard",
      analytics: "Analytics",
      settings: "Settings",
      users: "Users",
      restaurants: "Restaurants",
      orders: "Orders",
      revenue: "Revenue",

      // Common
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
    },
  },
  uz: {
    translation: {
      // Navigation
      home: "Bosh sahifa",
      restaurants: "Restoranlar",
      orders: "Buyurtmalar",
      profile: "Profil",
      login: "Kirish",
      register: "Ro'yxatdan o'tish",
      logout: "Chiqish",

      // Auth
      email: "Email",
      password: "Parol",
      confirmPassword: "Parolni tasdiqlang",
      firstName: "Ism",
      lastName: "Familiya",
      phone: "Telefon raqami",
      address: "Manzil",
      signIn: "Kirish",
      signUp: "Ro'yxatdan o'tish",
      forgotPassword: "Parolni unutdingizmi?",

      // Food Delivery
      orderNow: "Buyurtma berish",
      addToCart: "Savatga qo'shish",
      viewCart: "Savatni ko'rish",
      checkout: "To'lov",
      totalPrice: "Umumiy narx",
      deliveryFee: "Yetkazib berish haqi",
      searchFood: "Taom qidirish...",
      categories: "Kategoriyalar",
      popular: "Mashhur",
      nearbyRestaurants: "Yaqin restoranlar",

      // Dashboard
      dashboard: "Boshqaruv paneli",
      analytics: "Tahlil",
      settings: "Sozlamalar",
      users: "Foydalanuvchilar",
      restaurants: "Restoranlar",
      orders: "Buyurtmalar",
      revenue: "Daromad",

      // Common
      save: "Saqlash",
      cancel: "Bekor qilish",
      delete: "O'chirish",
      edit: "Tahrirlash",
      view: "Ko'rish",
      loading: "Yuklanmoqda...",
      error: "Xatolik",
      success: "Muvaffaqiyat",
      darkMode: "Qorong'u rejim",
      lightMode: "Yorug' rejim",
    },
  },
  ru: {
    translation: {
      // Navigation
      home: "Главная",
      restaurants: "Рестораны",
      orders: "Заказы",
      profile: "Профиль",
      login: "Войти",
      register: "Регистрация",
      logout: "Выйти",

      // Auth
      email: "Email",
      password: "Пароль",
      confirmPassword: "Подтвердите пароль",
      firstName: "Имя",
      lastName: "Фамилия",
      phone: "Номер телефона",
      address: "Адрес",
      signIn: "Войти",
      signUp: "Регистрация",
      forgotPassword: "Забыли пароль?",

      // Food Delivery
      orderNow: "Заказать сейчас",
      addToCart: "В корзину",
      viewCart: "Корзина",
      checkout: "Оформить заказ",
      totalPrice: "Общая стоимость",
      deliveryFee: "Доставка",
      searchFood: "Поиск еды...",
      categories: "Категории",
      popular: "Популярное",
      nearbyRestaurants: "Рестораны рядом",

      // Dashboard
      dashboard: "Панель управления",
      analytics: "Аналитика",
      settings: "Настройки",
      users: "Пользователи",
      restaurants: "Рестораны",
      orders: "Заказы",
      revenue: "Доходы",

      // Common
      save: "Сохранить",
      cancel: "Отмена",
      delete: "Удалить",
      edit: "Редактировать",
      view: "Просмотр",
      loading: "Загрузка...",
      error: "Ошибка",
      success: "Успех",
      darkMode: "Темная тема",
      lightMode: "Светлая тема",
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  })

export default i18n
