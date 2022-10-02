/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#000000",
        default: "#ffffff",
      },
      fontFamily: {
        sans: ["Poppins"],
      },
      borderRadius: {
        DEFAULT: "10px",
      },
      boxShadow: {
        DEFAULT: "0 0 12px 0 rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};
