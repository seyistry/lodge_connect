/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {

    extend: {
      colors: {
        brand: {
          100: '#FAFCFC',
          200: '#EEF6FF',
          500: '#3FAA6F',
        }
      },
      backgroundImage: {
        regback: "url('./src/assets/Register-Background.png')",
        
      }
    },

   

  },
  plugins: [],
};
