module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        custom: {
          'edit-green': '#257047',
          'view-yellow': '#ffab00',
          'delete-red': '#c11106',
          'status-active-blue': '#2d8eff', // Pastikan ini ada
        },
        
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
