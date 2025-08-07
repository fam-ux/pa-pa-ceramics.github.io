/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2a7d46',
          light: '#e6f4ea'
        }
      }
    },
  },
  plugins: [],
}


