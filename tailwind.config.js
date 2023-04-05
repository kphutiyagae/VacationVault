/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#220678ff',
        'primary-color-highlight': '#3c19da',
        'background-color': '#F6F6F6ff'
      }
    },
  },
  plugins: [],
}
