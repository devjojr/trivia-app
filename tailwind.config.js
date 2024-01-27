/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      maxWidth: {
        740: "740px",
      },
      boxShadow: {
        md: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
      },
      backgroundColor: {
        teal: "#03a9f4",
      },
      textColor: {
        white: "#fff",
        black: "#121212",
        blue: "#2196f3",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
