/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#0F1035",
        "light-blue": "#7FC7D9",
        "light-teal": "#DCF2F1",
        "custom-white": "#FFFFFF",
        "custom-black": "#000000",
      },
    },
  },
  plugins: [],
};
