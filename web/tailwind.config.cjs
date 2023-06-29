/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: { fit: 'fit-content' },
      colors: {
        primary: {
          100: '#F2F9FF', // ex: bg-primary-100
          200: '#D2E4FF', // ex: bg-primary-200
          300: '#B6D3FF', // ex: bg-primary-300
          400: '#87B7FF', // ex: bg-primary-400
          DEFAULT: '#87B7FF', // ex: bg-primary (sans préfixe. C'est le meme que le 400)
          500: '#4770FF', // ex: bg-primary-500
          700: '#0029BA', // ex: bg-primary-700 (Il est bien foncé donc j'ai mis à 700 et pas 600)
        },
        theme: "#17403B",
        beige: {
          DEFAULT: "#f6f0d8",
          light: "#fbf9f4",
        },
        green: {
          DEFAULT: "#17403b",
          dark: "#00231e"
        },
        white: {
          DEFAULT: "#ffffff",
          off: "#FBF9F4",
        },
        red : {
          DEFAULT: "#FF6147",
          accent: "#fa472c",
        },
      },
    },
  },
  plugins: [],
}
