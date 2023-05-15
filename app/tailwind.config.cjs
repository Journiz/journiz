/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                theme: {
                    DEFAULT: "var(--color-theme)",
                    light: "var(--color-theme-light)",
                    dark: "var(--color-theme-dark)",
                },
                beige: {
                    DEFAULT: "#f6f0d8",
                    light: "#fbf9f4",
                },
                green: {
                    DEFAULT: "#17403b",
                    dark: "#00231e",
                },
                blue: "#abd7ff",
                red: "#ff6147",
                yellow: "#ffd163",
                violet: "#e8b8ff"
            },
        },
    },
    plugins: [],
}
