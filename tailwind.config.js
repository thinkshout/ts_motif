const tokens = require("./tokens/tailwind-tokens.json");

module.exports = {
  mode: "jit",
  purge: ["./includes/**/*.inc", "./templates/**/*.{html,twig}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: tokens.color,
    fontFamily: tokens.font.family,
    fontWeight: tokens.font.weight,
    gap: tokens.grid.gap,
    opacity: tokens.opacity,
    screens: tokens.screen,
    spacing: tokens.spacer,
    transitionDuration: tokens.duration,
    zIndex: tokens.zIndex,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
