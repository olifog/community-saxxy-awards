module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkred: {
          light: '#2b030f',
          DEFAULT: '#120106'
        }
      },
      backgroundImage: theme => ({
        'process': "url('/process.jpg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
