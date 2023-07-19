const tokens = require('./tokens/tailwind-tokens.json');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  mode: NODE_ENV !== 'production' && 'jit',
  prefix: '',
  purge: ["./includes/**/*.inc", "./templates/**/*.{html,twig}"],
  darkMode: false, // or 'media' or 'class'
  content: [
    './templates/**/*.{html,twig}',
    './includes/**/*.inc',
  ],
  theme: {
    colors: tokens.color,
    container: {
      center: true
    },
    fontFamily: tokens.font.family,
    fontSize: tokens.font.size,
    fontWeight: tokens.font.weight,
    lineHeight: tokens.lh,
    opacity: tokens.opacity,
    screens: tokens.screen,
    spacing: tokens.spacer,
    transitionDuration: tokens.transition,
    zIndex: tokens.z,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
