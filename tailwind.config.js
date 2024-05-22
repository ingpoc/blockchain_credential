// tailwind.config.js
module.exports = {
  content: [
    "./extension/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["dark"],
  },
};
