module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    'cleanupListOfValues',
    'convertStyleToAttrs',
    'removeDimensions',
    'removeStyleElement',
    {
      name: 'removeUnusedNS',
      active: false,
    },
    {
      name: 'removeViewBox',
      active: false,
    },
  ],
};
