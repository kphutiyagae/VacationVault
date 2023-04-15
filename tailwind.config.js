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
      width: {
        'card-mobile' :'95%'
      },
      height: {
        'description-section-mobile': '8rem'
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0,1fr))",
        12: "repeat(12, minmax(0,1fr))",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
      },
      gridRowEnd: {
        8: "8",
        9: '9',
        10: "10",
        11: "11",
        12: "12",
        13: "13",
      },
    },
  },
  plugins: [],
}
