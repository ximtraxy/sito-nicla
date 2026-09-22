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
        background: "var(--background)",
        foreground: "var(--foreground)",
        editorial: {
          dark: "#0b0b0c",
          surface: "#141416",
          card: "#1a1a1e",
          border: "#26262b",
          subtle: "#71717a",
          text: "#f4f4f5",
          accent: "#e4d5b7",
          cream: "#faf8f5",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        magazine: "0.25em",
      },
    },
  },
  plugins: [],
};
export default config;
