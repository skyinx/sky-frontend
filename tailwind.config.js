/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BA0101",
        black: "#0F0F0E",
        pending: "#F59E0B",
        accepted: "#16A34A",
        rejected: "#DC2626",
        cancelled: "#450A0A",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease",
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
