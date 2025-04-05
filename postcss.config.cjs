// module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };

// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // Use the correct PostCSS plugin
    autoprefixer: {},
  },
};
