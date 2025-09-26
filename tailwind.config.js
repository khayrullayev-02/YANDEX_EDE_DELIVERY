// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}", // ✅ shadcn UI uchun to‘g‘rilandi
  ],
  theme: {
    extend: {
      // 💡 BORDER RANGI QO'SHILDI
      colors: {
        border: "hsl(0 0% 18%)", // Dark loyihalar uchun mos default to'q rang
        // ------------------------
        neon: {
          blue: "#00f5ff",
          purple: "#bf00ff",
          pink: "#ff0080",
          green: "#00ff41",
          yellow: "#ffff00",
          orange: "#ff8000",
        },
        dark: {
          900: "#0a0a0a",
          800: "#1a1a1a",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#4a4a4a",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      animation: {
        "neon-pulse": "neon-pulse 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        particle: "particle 20s linear infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%": {
            textShadow:
              "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            boxShadow:
              "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
          },
          "100%": {
            textShadow:
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            boxShadow:
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { filter: "brightness(1) saturate(1)" },
          "100%": { filter: "brightness(1.2) saturate(1.5)" },
        },
        particle: {
          "0%": {
            transform: "translateY(100vh) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(-100vh) rotate(360deg)",
            opacity: "0",
          },
        },
      },
      backgroundImage: {
        "neon-gradient":
          "linear-gradient(45deg, #00f5ff, #bf00ff, #ff0080)",
        "dark-gradient":
          "linear-gradient(135deg, #0a0a0a, #1a1a1a, #2a2a2a)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};