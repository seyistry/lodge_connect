/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      brand: {
        100: '#FAFCFC',
        200: '#EEF6FF',
        500: '#3FAA6F',
      },
      brandText: {
        100: '#6F7377',
        500: '#1C1D36',
      },
    },
    extend: {
      backgroundImage: {
        'hero-bottom': "url('./src/assets/images/herobg.jpg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
