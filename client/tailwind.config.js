// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all file types you’re using
  ],
  theme: {
    extend: {
      top: {
        "22r": "22rem",
      },
    },
  },
  plugins: [],
};
