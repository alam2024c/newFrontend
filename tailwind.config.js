/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { screens: {
      '1260': '1260px', // Custom screen for 1260px and up
    }},
  },
  darkMode: 'class', // Enables dark mode with a 'dark' class
  plugins: [],
};

