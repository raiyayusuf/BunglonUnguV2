// tailwind.config.ts:
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#433878",
        primary: "#7e60bf",
        "primary-light": "#e4b1f0",
        "primary-soft": "#ffe1ff",
        "text-dark": "#2d3436",
        "text-light": "#f8f9fa",
        "bg-light": "#fefefe",
      },
      backgroundColor: {
        "primary-gradient": "linear-gradient(135deg, #433878 0%, #7e60bf 100%)",
        "light-gradient":
          "linear-gradient(to bottom, #ffe1ff 0%, #fefefe 100%)",
      },
      textColor: {
        "primary-gradient": "linear-gradient(135deg, #433878 0%, #7e60bf 100%)",
      },
      boxShadow: {
        bunglon: "0 4px 20px rgba(67, 56, 120, 0.3)",
        "bunglon-light": "0 5px 20px rgba(67, 56, 120, 0.15)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        bunglon: "8px",
        "bunglon-lg": "15px",
        "bunglon-xl": "20px",
      },
      animation: {
        "pulse-slow": "pulse 3s infinite",
        "bounce-slow": "bounce 2s infinite",
        "running-slide": "runningSlide 80s linear infinite",
        scroll: "scroll 40s linear infinite",
      },
      keyframes: {
        runningSlide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-280px * 16 - 2rem * 16))" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-256px * 8))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
