// src/stores/authStore.js
import { create } from "zustand";
import axios from "axios";

// Backend API manzilingiz. Misol uchun: "http://127.0.0.1:8000"
const API_BASE_URL = "http://127.0.0.1:8000"; 

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,

  setLoading: (isLoading) => set({ loading: isLoading }),

  // --- RO'YXATDAN O'TISH (REGISTER) API ---
  register: async (formData) => {
    set({ loading: true });
    try {
      // Backend sizning talabingiz bo'yicha ma'lumotlarni oladi:
      // { username, email, password, phone, role }

      // Sizning Register komponentingizda username va role/userType yo'q.
      // Bularni qo'shish kerak. Vaqtinchalik role: 'customer' deb olindi.
      
      // Ro'yxatdan o'tish uchun faqat kerakli ma'lumotlarni yuboramiz.
      const payload = {
        username: formData.email.split('@')[0], // Vaqtinchalik username emailning birinchi qismi qilindi
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        // Backend 'role' ni talab qilgani uchun 'userType' ni 'role' ga o'zgartiramiz
        role: formData.userType, 
        // firstName, lastName, address yuborilmadi, chunki backend ularni talab qilmagan.
      };

      const response = await axios.post(`${API_BASE_URL}/api/auth/register/`, payload);

      // Agar backend ro'yxatdan o'tishdan so'ng darhol token qaytarsa, uni saqlaymiz:
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Bu erda user objectni ham olish va saqlash kerak bo'lishi mumkin.
        set({ token: response.data.token }); 
      }

      set({ loading: false });
      return { success: true, data: response.data };

    } catch (error) {
      set({ loading: false });
      console.error("Registration error:", error.response?.data || error.message);
      let errorMessage = "Registration failed. Please check your data.";
      
      // Backend xato xabarlarini ajratib olish
      if (error.response?.data) {
        // Ob'ektdagi har bir xato xabarini yig'ish
        const errors = error.response.data;
        errorMessage = Object.keys(errors)
          .map(key => `${key}: ${errors[key].join(', ')}`)
          .join('\n');
      }

      return { success: false, error: errorMessage };
    }
  },

  // --- KIRISH (LOGIN) API ---
  login: async (formData) => {
    set({ loading: true });
    try {
      // Backend talab qilgan ma'lumotlar: { email, username (ixtiyoriy), password }
      // Faqat email va password yuboramiz
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, payload);

      const { user, token } = response.data; // Faraz qilamizki, backend user va token qaytaradi

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({ user, token, loading: false });
      return { success: true, data: response.data };
      
    } catch (error) {
      set({ loading: false });
      console.error("Login error:", error.response?.data || error.message);
      
      let errorMessage = "Login failed. Invalid email or password.";
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.data) {
        // Boshqa xato turlarini ajratib olish
        const errors = error.response.data;
        errorMessage = Object.keys(errors)
          .map(key => `${key}: ${errors[key].join(', ')}`)
          .join('\n');
      }
      
      return { success: false, error: errorMessage };
    }
  },

  // Chiqish (Logout) funktsiyasi
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;