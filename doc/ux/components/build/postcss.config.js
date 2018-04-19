module.exports = {
  plugins: [
    require('postcss-salad')({
      browsers: ['ie > 9', 'last 2 versions'],
      features: {
        autoprefixer: {
          remove: false,
        },
      },
    }),
  ],
};
