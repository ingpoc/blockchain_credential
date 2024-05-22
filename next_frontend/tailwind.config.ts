// tailwind.config.js
module.exports = {
  content: [
    "./extension/**/*.{html,js}",
    // Add more paths to your files here
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["dark"], // Use the dark theme
  },
};

