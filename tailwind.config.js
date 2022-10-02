/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#000000",
        default: "#252525",
        primary: "#D83442",
      },
      fontFamily: {
        sans: ["Poppins"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      boxShadow: {
        DEFAULT: "0 0 12px 0 rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};
