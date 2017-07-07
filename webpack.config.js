const webpack = require('webpack');

module.exports = {
  output: {
    filename: 'JR.js',
    library: 'JRUI',
    libraryTarget: 'umd',
  },
  externals: {
    regularjs: {
      root: 'Regular',
      amd: 'Regular',
      commonjs: 'regularjs',
      commonjs2: 'regularjs',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime'],
        },
      },
      {
        test: /\.html$/,
        loader: 'text-loader',
      },
      {
        test: /\.mcss$/,
        loader: 'style!css!mcss',
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'JR.js.map',
      columns: false,
    }),
  ],
};
