/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}" , "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      spacing: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
    },
  },
  plugins: [ require('flowbite/plugin')],
}

