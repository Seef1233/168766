import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'ui-serif', 'serif'],
      },
      colors: {
        cream: {
          50:  '#FFFBF5',
          100: '#FFF3E0',
        },
        stone: {
          850: '#1C1917',
        }
      },
      boxShadow: {
        card:    '0 2px 12px rgba(0,0,0,0.07)',
        'card-hover': '0 16px 40px rgba(0,0,0,0.13)',
        'orange': '0 8px 24px rgba(249,115,22,0.35)',
      },
      transitionDuration: {
        '400': '400ms',
      }
    }
  }
} satisfies Config
