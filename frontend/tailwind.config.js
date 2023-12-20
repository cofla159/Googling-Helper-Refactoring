/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "google-blue": "#4285F4",
        "google-red": "#EA4335",
        "google-green": "#34A853",
        "google-yellow": "#FBBC05",
        "red-nomal": "#f87171",
        "red-light": "#fca5a5",
        "red-dark": "#ef4444",
      },
    },
  },
  plugins: [require("daisyui")],
};

