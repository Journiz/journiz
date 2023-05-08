/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: { fit: 'fit-content' },
      colors: {
        beige: {
          DEFAULT: "#f6f0d8",
          light: "#fbf9f4",
        },
        green: {
          DEFAULT: "#17403b",
          dark: "#00231e"
        },
        ref : "#FF6147",
      },
    },
  },
  plugins: [],
}
