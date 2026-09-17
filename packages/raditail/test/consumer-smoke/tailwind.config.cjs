// Documented setup from the package README, verbatim in CJS so Tailwind can
// load it without a TypeScript loader.
const { raditailPreset } = require('raditail/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    // Required: component styles live in the published build, not your source.
    './node_modules/raditail/dist/**/*.{js,mjs}',
  ],
  presets: [raditailPreset],
}
