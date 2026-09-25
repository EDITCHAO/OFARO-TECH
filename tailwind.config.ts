import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

/**
 * Design system OFARO TECH
 *
 * - primary  : orange de marque (#FF6B00) — actions, accents, liens
 * - accent   : or du logo (#D4AF37) — touches premium, décorations
 * - neutral  : gris chauds — textes, bordures, surfaces
 * - success / warning / danger / info : couleurs sémantiques (statuts, alertes)
 *
 * Les composants n'utilisent que ces tokens : jamais de `orange-500`,
 * `blue-600`, `purple-*`… directement dans le JSX.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF4EB",
          100: "#FFE4CC",
          200: "#FFC899",
          300: "#FFA866",
          400: "#FF8833",
          500: "#FF6B00",
          600: "#E05E00",
          700: "#B84D00",
          800: "#8F3C00",
          900: "#662B00",
          950: "#3D1A00",
          DEFAULT: "#FF6B00",
          light: "#FF8533",
          dark: "#CC5500",
        },
        accent: {
          50: "#FBF7E8",
          100: "#F5ECC7",
          200: "#ECDA95",
          300: "#E2C663",
          400: "#D9B53D",
          500: "#D4AF37",
          600: "#B3922B",
          700: "#8C7222",
          800: "#66531A",
          900: "#403411",
          DEFAULT: "#D4AF37",
        },
        neutral: colors.zinc,
        success: colors.emerald,
        warning: colors.amber,
        danger: colors.red,
        info: colors.sky,
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8F9FA",
          subtle: "#F1F3F5",
          inverse: "#0B0B0C",
        },
        ink: {
          DEFAULT: "#0B0B0C",
          secondary: "#52525B",
          muted: "#71717A",
          inverse: "#FFFFFF",
        },
        // Alias historiques conservés pour compatibilité
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8F9FA",
        },
        text: {
          DEFAULT: "#0B0B0C",
          secondary: "#52525B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 11, 12, 0.04), 0 8px 24px -12px rgba(11, 11, 12, 0.12)",
        "card-hover": "0 2px 4px rgba(11, 11, 12, 0.06), 0 16px 40px -16px rgba(255, 107, 0, 0.35)",
        glow: "0 0 0 4px rgba(255, 107, 0, 0.15)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
