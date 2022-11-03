const tokens = require('./tokens/tailwind-tokens.json');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  mode: NODE_ENV !== 'production' && 'jit',
  prefix: '',
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
    gap: tokens.grid.gap,
    lineHeight: tokens.lh,
    opacity: tokens.opacity,
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
}
