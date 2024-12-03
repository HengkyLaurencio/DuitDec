module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
            primary: '#192227', 
            secondary: '#f9a600',
        },
        fontFamily: {
          'poppins': ['Poppins', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
    },
},
  plugins: [],
}