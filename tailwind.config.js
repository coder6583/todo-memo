// /** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  content: [
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      theme1: "#60A5FA",
      theme2: "#1B998B",
      theme3: "#999999",
      todo: "#772222",
      ondeck: "#777722",
      done: "#227722",
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
