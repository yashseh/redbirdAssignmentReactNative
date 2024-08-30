/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111015',
        ternary: '#22222A',
        green: '#12C358',
        blackTernary: '#18171C',
        black: '#19191D',
        red: '#F73C54',
        gradientLight: '#E1D24A',
        gradientDark: '#C69233',
        darkGrey: '#6A6A6E',
        blackSecondary: '#16151B',
        skelton: '#2A2A2A',
      },
      fontFamily: {
        regular: ['inter-regular'],
        bold: ['inter-bold'],
        medium: ['inter-Medium'],
      },
    },
  },
  plugins: [],
};
