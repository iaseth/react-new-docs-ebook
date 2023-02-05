/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
        addVariant('ch', '& > *');
        addVariant('ch2', '& > * > *');
        addVariant('ch3', '& > * > * > *');
    }
  ],
}
