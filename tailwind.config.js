/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'minimal-bg': '#fcfcfc',
        'minimal-gray': '#f4f4f5',
        'minimal-border': '#e4e4e7',
        'minimal-text': '#18181b',
        'minimal-text-light': '#71717a',
        'minimal-accent': '#005BEA' 
      },
      fontFamily: {
        sans: ['Arial', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
