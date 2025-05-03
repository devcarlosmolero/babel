/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        fontFamily: {
            primary: "var(--babel-font-primary)",
            secondary: "var(--babel-font-secondary)",
        },
        extend: {
            colors: {
                primary: 'hsl(var(--babel-color-primary))',
                tertiary: 'hsl(var(--babel-color-tertiary))',
                accent: 'hsl(var(--babel-color-accent))',
                border: 'hsl(var(--babel-color-border))'
            }
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-hamburgers'),
        require('@tailwindcss/typography'),
    ],
}
