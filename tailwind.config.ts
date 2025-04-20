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
          light: "#2D2C2C",
          DEFAULT: "#232020", // 24201F
          dark: "#121212",
        },
        primary: {
          DEFAULT: "#2D2B2C", // 
        },
        secondary: {
          DEFAULT: "#9C7E57", // 
          //DEFAULT: "#C9A55C", // Rich gold
        },
        accent: {
          DEFAULT: "#9C7E57", // 
        },
        text: {
          DEFAULT: "#F4ECE5", // Brukt til meny og overskrifter
          soft: "#C1C2B9", // Dempet for brødtekst
        },
        border: {
          DEFAULT: "#3A3A3A", 
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
        'gold-gradient-vertical': 'linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
        'gold-simple': 'linear-gradient(to right, #B38728, #FCDB7A, #B38728)',
        'gold-subtle': 'linear-gradient(to right, rgba(179, 135, 40, 0.2), rgba(212, 175, 55, 0.5), rgba(179, 135, 40, 0.2))',
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
