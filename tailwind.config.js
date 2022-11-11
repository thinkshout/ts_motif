const tokens = require("./tokens/tailwind-tokens.json");

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  mode: 'jit',
  purge: ["./includes/**/*.inc", "./templates/**/*.{html,twig}","./../../../modules/contrib/ts_patterns/templates/**/**/**/**/*.{html,twig}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: tokens.color,
    container: {
      center: true
    },
    fontFamily: tokens.font.family,
    fontSize: tokens.font.size,
    fontWeight: tokens.font.weight,
    lineHeight: tokens.lh,
    screens: tokens.screen,
    spacing: tokens.spacer,
    transitionDuration: tokens.duration,
    zIndex: tokens.z,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
