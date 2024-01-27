/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],

  daisyui: {
    themes: ['light', 'dark']
  },

  theme: {
    extend: {
      colors: {
        'brown': '#834333',
      },

      animation: {
        fade: "fade 0.5s",
      },

      keyframes: {
        fade: {
          "0%": {
            opacity: "0%",
          },

          "100%": {
            opacity: "100%",
          },
        },
      }
    },
  },

  plugins: [require("daisyui")],
}

