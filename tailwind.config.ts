import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      bg: {
        main: "#4A76B3",
        sub: "#F0F0F0",
      },
      text: {
        main: "#F0F0F0",
        sub: "#6b7280d9",
      },
    },
    fontFamily: {
      "noto-sans": ["Noto Sans JP", "sans-serif"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
