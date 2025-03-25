import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A1F2C", // Deep navy
        },
        secondary: {
          DEFAULT: "#C9A55C", // Rich gold
        },
        accent: {
          DEFAULT: "#E8C1C5", // Soft rose
        },
        background: {
          DEFAULT: "#F8F6F4", // Off-white
        },
        text: {
          DEFAULT: "#2C2C2C", // Dark charcoal
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};

export default config; 