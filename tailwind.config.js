const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      screens: { custom_sm: "790px", custom_md: "1190px", custom_lg: "1585px" },
      width: {
        "80p": "80%",
      },
    },
  },
  plugins: [require("tailwindcss-important")()],
});
