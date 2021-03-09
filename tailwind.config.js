module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        darkred: {
          light: '#2b030f',
          DEFAULT: '#120106'
        }
      }
    },
    aspectRatio: {
      '16/9': [16, 9]
    }
  },
  variants: {
    extend: {},
    aspectRatio: ['responsive']
  },
  plugins: [
    require('tailwindcss-aspect-ratio')
  ]
}
