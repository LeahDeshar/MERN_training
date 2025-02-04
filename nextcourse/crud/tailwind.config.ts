import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#9333EA",
          light: "#A855F7",
          dark: "#7E22CE",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2563EB 0%, #9333EA 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #F59E0B 0%, #9333EA 100%)",
        "gradient-dark": "linear-gradient(135deg, #1E293B 0%, #000000 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
