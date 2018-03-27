module.exports = {
  plugins: [
    require('postcss-salad')({
      browsers: ['ie > 9', 'last 2 versions'],
      features: {
        autoprefixer: {
          remove: false,
        },
        bem: {
          shortcuts: {
            component: 'b',
            descendent: 'e',
            modifier: 'm',
          },
          separators: {
            descendent: '__',
            modifier: '--',
          },
        },
      },
    }),
  ],
};
