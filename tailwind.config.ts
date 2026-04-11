import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Green Theme
        'sr-green': {
          bg: '#0a1a0f',
          surface: '#0f2318',
          card: '#122b1c',
          accent: '#2ecc71',
          'accent-dark': '#27ae60',
          text: '#e8f5e9',
          'text-muted': '#a5d6a7',
          border: '#1e4d2b',
          overlay: 'rgba(10, 26, 15, 0.85)',
        },
        // Black Theme
        'sr-black': {
          bg: '#0a0a0a',
          surface: '#141414',
          card: '#1a1a1a',
          accent: '#f5c518',
          'accent-dark': '#d4a017',
          text: '#f0f0f0',
          'text-muted': '#999999',
          border: '#2a2a2a',
          overlay: 'rgba(10, 10, 10, 0.85)',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
}

export default config
