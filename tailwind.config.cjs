module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        architect: 'Architects Daughter',
        antic: 'Antic',
        anton: 'Anton'
      },
      colors: {
        purple: {
          50: '#E1FBFF',
          100: '#C2F8FF',
          200: '#80F0FE',
          300: '#43E8FE',
          400: '#01E0FE',
          500: '#01AAC1',
          600: '#018798',
          700: '#016775',
          800: '#00434C',
          900: '#002429'
        },
        red: {
          50: "#FDE7E7",
          100: "#FBCBCB",
          200: "#F79C9C",
          300: "#F36868",
          400: "#EE3434",
          500: "#DA1212",
          600: "#AE0E0E",
          700: "#840B0B",
          800: "#590707",
          900: "#2A0404"
        }
      },
      backgroundImage: {
        sun: "url('@/assets/img/sun.svg')",
        moon: "url('@/assets/img/moon.png')",
      }
    },
  },
  plugins: [],
}
