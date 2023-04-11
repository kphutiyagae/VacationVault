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
        'background-color': '#F6F6F6ff',
        'card-background-color': '#F0ECFE',

      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0,1fr))",
      },
      gridRowEnd: {
        10: "10",
        11: "11",
      },
    },
  },
  plugins: [],
}
