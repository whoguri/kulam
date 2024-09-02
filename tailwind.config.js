/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090B27",
        primary: "#F5BC46",
        "primary-dark": "#ee7b31",
        input: "#D9D9D9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        sparkle: "sparkle 1s infinite ease-in-out",
        breathing: "breathing 6s infinite", // Merged both animations here
      },
      keyframes: {
        sparkle: {
          "0%, 100%": { opacity: 0, transform: "scale(0.5) rotate(0deg)" },
          "50%": { opacity: 0.4, transform: "scale(1.5) rotate(45deg)" },
        },
        breathing: {
          // Merged both keyframes here
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
