/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'fade-in-1s': 'fade-in-1s 1s ease-out forwards',
        'fade-in-2s': 'fade-in-2s 2s ease-out forwards',
        'fade-in-3s': 'fade-in-3s 3s ease-out forwards',
        'fade-in-4s': 'fade-in-4s 4s ease-out forwards',
        'fade-in-5s': 'fade-in-5s 5s ease-out forwards'
      },
      keyframes: {
        'fade-in-1s': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-2s': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-3s': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-4s': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-5s': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

