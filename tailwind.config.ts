import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'],
      },
      colors: {
        brand: {
          orange:  '#F5A624',
          'orange-dim': 'rgba(245,166,36,0.12)',
          'orange-glow': 'rgba(245,166,36,0.25)',
          cream:   '#E5D4B0',
          navy:    '#1B3347',
          bg:      '#080808',
          'bg-2':  '#0F0F0F',
          card:    '#141414',
          border:  'rgba(255,255,255,0.07)',
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        pulse2: 'pulse2 3s ease-in-out infinite',
        grain: 'grain 8s steps(10) infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse2: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(245,166,36,0.4)' },
          '50%':     { boxShadow: '0 0 32px 12px rgba(245,166,36,0.15)' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%':     { transform: 'translate(-3%,-8%)' },
          '20%':     { transform: 'translate(-10%,5%)' },
          '30%':     { transform: 'translate(5%,-18%)' },
          '40%':     { transform: 'translate(-5%,20%)' },
          '50%':     { transform: 'translate(-12%,8%)' },
          '60%':     { transform: 'translate(12%,0%)' },
          '70%':     { transform: 'translate(0%,12%)' },
          '80%':     { transform: 'translate(3%,30%)' },
          '90%':     { transform: 'translate(-8%,8%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
