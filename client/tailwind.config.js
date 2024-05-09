/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      colors: {
        "main-color-green": "var(--main-color-green)",
        "main-color-yellow": "var(--main-color-yellow)",
        "main-color-lightgrey": "var(--main-color-lightgrey)",
        "accent-color-white": "var(--accent-color-white)",
        "accent-color-black": "var(--accent-color-black)",
      },
    },
  },
  plugins: [
  ],
}

