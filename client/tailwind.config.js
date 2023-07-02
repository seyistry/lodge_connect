/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'reg-back': "url('./src/assets/Register-Background.png')",
        
      }
    },
  },
  plugins: [],
};
