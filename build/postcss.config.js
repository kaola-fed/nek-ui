module.exports = {
  plugins: [
    require('postcss-salad')({
      browsers: ['ie > 6', 'last 2 versions'],
      features: {
        autoprefixer: {
          remove: false,
        },
      },
    }),
  ],
};
