module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kobra: {
          black: '#0A0A0A',
          green: '#39FF14',
          cyan: '#00E5FF',
          white: '#FFFFFF',
          gray: '#1A1A1A',
          darkgray: '#2A2A2A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(57, 255, 20, 0.3)' },
          '50%': { opacity: '.8', boxShadow: '0 0 40px rgba(57, 255, 20, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
