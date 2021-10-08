const tokens = require("./tokens/tailwind-tokens.json");

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  mode: NODE_ENV !== 'production' && 'jit',
  purge: ["./includes/**/*.inc", "./templates/**/*.{html,twig}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: tokens.color,
    container: {
      center: true
    },
    fontFamily: tokens.font.family,
    fontSize: tokens.font.size,
    fontWeight: tokens.font.weight,
    gap: tokens.grid.gap,
    lineHeight: tokens.lineHeight,
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
