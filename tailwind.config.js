/** @type {import('tailwindcss').Config} */
// const tabletBreakpoint =
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C10206',
        secondary: '#263238',
        red: '#8B0000',
        lightHover: '#EA002E',
        darkHover: '#34495e',
        darkOrange: '#FF9500',
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
      },
    },
    screens: {
      // xs: '360px',
      sm: '480px',
      md: '768px',
      // ipad: '830px',
      lg: '1200px',
      // minixl: '1200px',
      xl: '1440px',
      '2xl': '1536px',
      '3xl': '1920px',

      maxmd: { max: '768px' },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')({
      // strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
};
