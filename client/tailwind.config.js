/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      brand: {
        100: '#FAFCFC',
        200: '#EEF6FF',
        500: '#3FAA6F',
      }
    },
    extend: {},
  },
  plugins: [],
};
