/* 
  tailwind.config.ts
  Organized by: raiyayusuf
*/

import type { Config } from "tailwindcss";

const config: Config = {
  /* ============================================
     CONTENT PATHS CONFIGURATION
     ============================================ */
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  /* ============================================
     THEME EXTENSIONS
     ============================================ */
  theme: {
    extend: {
      /* ============================================
         COLOR PALETTE
         ============================================ */
      colors: {
        /* Primary Brand Colors - Purple Theme */
        "primary-dark": "#433878", // Deep Purple
        primary: "#7e60bf", // Main Purple
        "primary-light": "#e4b1f0", // Light Purple
        "primary-soft": "#ffe1ff", // Soft Pink/Purple

        /* Text Colors */
        "text-dark": "#2d3436", // Dark Gray
        "text-light": "#f8f9fa", // Light Gray

        /* Background Colors */
        "bg-light": "#fefefe", // Off-White
      },

      /* ============================================
         GRADIENT BACKGROUNDS
         ============================================ */
      backgroundColor: {
        "primary-gradient": "linear-gradient(135deg, #433878 0%, #7e60bf 100%)",
        "light-gradient":
          "linear-gradient(to bottom, #ffe1ff 0%, #fefefe 100%)",
      },

      /* ============================================
         GRADIENT TEXT COLORS
         ============================================ */
      textColor: {
        "primary-gradient": "linear-gradient(135deg, #433878 0%, #7e60bf 100%)",
      },

      /* ============================================
         CUSTOM SHADOW SYSTEM
         ============================================ */
      boxShadow: {
        /* Purple-themed shadows */
        bunglon: "0 4px 20px rgba(67, 56, 120, 0.3)", // Standard shadow
        "bunglon-light": "0 5px 20px rgba(67, 56, 120, 0.15)", // Light shadow
      },

      /* ============================================
         TYPOGRAPHY CONFIGURATION
         ============================================ */
      fontFamily: {
        /* Primary font family - Poppins */
        poppins: ["Poppins", "sans-serif"],

        /* Default sans-serif stack */
        sans: ["Poppins", "system-ui", "sans-serif"],
      },

      /* ============================================
         BORDER RADIUS SYSTEM
         ============================================ */
      borderRadius: {
        /* Custom radius scale */
        bunglon: "8px", // Small radius
        "bunglon-lg": "15px", // Medium radius
        "bunglon-xl": "20px", // Large radius
      },

      /* ============================================
         CUSTOM ANIMATIONS
         ============================================ */
      animation: {
        /* Extended animation utilities */
        "pulse-slow": "pulse 3s infinite", // Slow pulse
        "bounce-slow": "bounce 2s infinite", // Slow bounce
        "running-slide": "runningSlide 80s linear infinite", // Carousel animation
        scroll: "scroll 40s linear infinite", // Slider animation
      },

      /* ============================================
         KEYFRAMES DEFINITION
         ============================================ */
      keyframes: {
        /* Running slide for infinite carousels */
        runningSlide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-280px * 16 - 2rem * 16))" },
        },

        /* Scroll animation for product sliders */
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-256px * 8))" },
        },
      },
    },
  },

  /* ============================================
     TAILWIND PLUGINS
     ============================================ */
  plugins: [],
};

/* ============================================
   CONFIGURATION EXPORT
   ============================================ */
export default config;
