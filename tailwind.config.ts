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
        background: {
          light: "#2D2C2C", // lysere grå
          DEFAULT: "#000000", // black
          dark: "#111111", // mørk grå
        },
        primary: {
          DEFAULT: "#000000", // 
        },
        secondary: {
          DEFAULT: "#988A63", // 
          //DEFAULT: "#C9A55C", // Rich gold
        },
        accent: {
          DEFAULT: "#988A63", // 
        },
        text: {
          DEFAULT: "#FFFFFF", // Lys tekst
          soft: "#F5F5F5",  // Lysgrå tekst
        },
        border: {
          DEFAULT: "#3A3A3A", 
        },
        gold: "#C9A96C",
        champagne: "#D5B98E",
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
        'gold-gradient-vertical': 'linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
        'gold-simple': 'linear-gradient(to right, #B38728, #FCDB7A, #B38728)',
        'gold-subtle': 'linear-gradient(to right, rgba(179, 135, 40, 0.2), rgba(212, 175, 55, 0.5), rgba(179, 135, 40, 0.2))',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
