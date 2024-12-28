/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0F1035",
        lightBlue: "#7FC7D9",
        lightTeal: "#DCF2F1",
      },
    },
  },
  plugins: [],
};
