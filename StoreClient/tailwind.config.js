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
        'light-grey': '#F7F8F9',
      }
    },
  },

  plugins: [require("daisyui")],
}

