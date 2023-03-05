/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        SlideDown: "slideDown 1s ease-in-out forwards",
      },
      fontFamily: {
        Karla: ["Karla"],
        Inter: ["Inter"],
      },
      colors: {
        bgColor: "hsl(var(--bgColor) / <alpha-value>)",
        txtColor: "hsl(var(--txtColor) / <alpha-value>)",
        btnBg: "hsl(var(--btnBg) / <alpha-value>)",
        borderColor: "hsl(var(--btnBg) / <alpha-value>)",
        OffWhite: "hsl(var(--OffWhite) / <alpha-value>)",
        correctColor: "hsl(var(--correctColor) / <alpha-value>)",
        incorrectColor: "hsl(var(--incorrectColor) / <alpha-value>)",
        active: "hsl(var(--active) / <alpha-value>)",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
