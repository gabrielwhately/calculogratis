import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
    { pattern: /bg-(red|indigo|amber|teal)-50/ },
    { pattern: /text-(red|indigo|amber|teal)-600/ },
    { pattern: /border-(red|indigo|amber|teal)-(100|300)/, variants: ['hover'] },
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1a2332', light: '#2a3a4f', dark: '#111827' },
        accent: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
