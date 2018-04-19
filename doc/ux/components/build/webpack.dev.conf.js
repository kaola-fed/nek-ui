/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './examples/main',
    vendors: 'regularjs',
  },
  output: {
    filename: 'ux-ui.js',
    library: 'UXUI',
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
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
    },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader', // compiles Sass to CSS
        options: {
          sourceMap: true,
        },
      }],
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'css-loader',
        options: {
          minimize: false,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './build/postcss.config.js',
          },
          sourceMap: true,
        },
      },
      ],
    }, {
      test: /\.html$/,
      loader: 'text-loader',
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
    },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'ux-ui.js.map',
      columns: false,
    }),
  ],
};
