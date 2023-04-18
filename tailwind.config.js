/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#0000A3',
        'primary-color-highlight': '#1F1FFF',
        'background-color': '#F6F6F6ff',
        'card-background-color': '#ACCFEC',
        'card-hover-background': '#40a9ff',
        'background-color-dark-theme': '#011627',
      },
      margin: {
        '7.5': '1.8rem'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'bebas': ['Bebas Neue', 'sans-serif']
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
