/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      backgroundImage: {
        //'custom-image': "url('./src/assets/bg.jpg')"
        'custom-image': "url('/src/assets/bg.jpg')"
      },
      fontFamily: {
        creepster: ['Creepster', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
        custom: ['show', 'sans-serif']
      },
    },
  },
  plugins: [],
}
