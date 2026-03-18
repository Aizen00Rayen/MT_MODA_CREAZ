/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark: '#A8852A',
          muted: 'rgba(201, 168, 76, 0.15)',
        },
        ivory: '#FAFAFA',
        charcoal: '#1A1A1A',
        'slate-dark': '#2A2A2A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        ui: ['"Josefin Sans"', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201, 168, 76, 0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.95) 100%)',
      },
      boxShadow: {
        gold: '0 0 20px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 0 40px rgba(201, 168, 76, 0.4)',
        dark: '0 4px 32px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
