import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: {
            light: "#FFE17D",
            DEFAULT: "#FFD700",
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config;

export default config;
