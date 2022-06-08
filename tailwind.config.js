module.exports = {
  content: ['./*.html','./*.js'],
  theme: {
    extend: {
      backgroundImage: {
        'header':"url('/assets/img/pattern-bg.png')",
        'btn': "url('/assets/img/icon-arrow.svg')"
      },
      colors: {
        veryDarkGray: " hsl(0, 0%, 17%)",
        darkGray: " hsl(0, 0%, 59%)"
      },
      fontSize: {
        xxs: "8px"
      }
    },
  },
  plugins: [],
}
