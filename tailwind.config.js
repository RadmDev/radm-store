/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        color: {
          white: {
            1: "#FFFFFF",
            2: "#EEEEEE",
          },
          black: {
            1: "#000000",
          },
          blue: "#23BEBE",
          red: "#FF6363",
          yellow: "#E9D53B",
        },
      },
    },
  },
  plugins: [],
};
