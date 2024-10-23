/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // Esto habilita el modo oscuro basado en clases
  theme: {
    extend: {},
  },
  plugins: [],
};
