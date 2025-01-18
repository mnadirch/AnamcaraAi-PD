/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      keyframes: {
        typeLeft: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        typeRight: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        fontFamily: {
          mowaq: ['Mowaq', 'sans-serif'], 
          calibri: ['"Calibri"', 'sans-serif'],
        },
        blinkShine: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        blinkDull: {
          '0%, 50%': { opacity: '0' },
          '51%, 100%': { opacity: '1' },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        'type-left': 'typeLeft 2s steps(10, end) forwards', // For "WELCOME"
        'type-right': 'typeRight 2s steps(5, end) forwards 3s', // For "HUMAN", delayed by 3 seconds
        'blink-shine': 'blinkShine 3s infinite',
        'blink-dull': 'blinkDull 3s infinite',
        "slide-in-left": "slideInLeft 0.5s ease-out",

      },
      animationDelay: {
        0: '0s',
        500: '0.5s',
      },
    },
  },
  plugins: [],
};
