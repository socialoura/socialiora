import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
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
        primary: {
          DEFAULT: '#7C3AED',
          50: '#F5F0FF',
          100: '#EDE5FF',
          200: '#D4BFFF',
          300: '#B794F6',
          400: '#9F6AED',
          500: '#7C3AED',
          600: '#6522D1',
          700: '#4F1AAB',
          800: '#3B1382',
          900: '#270D59',
        },
        accent: {
          DEFAULT: '#DB2777',
          light: '#F472B6',
          dark: '#9D174D',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundSize: {
        '200': '200%',
      },
      backgroundPosition: {
        'pos-0': '0% 50%',
        'pos-100': '100% 50%',
      },
    },
  },
  plugins: [],
};
export default config;
