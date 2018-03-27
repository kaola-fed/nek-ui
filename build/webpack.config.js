const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'demo.css',
});

module.exports = {
  output: {
    filename: 'nek-ui.js',
    library: 'NEKUI',
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
      exclude: /(node_modules|bower_components)/,
                // loader: "babel-loader",
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
      test: /\.mcss$/,
                // use: extractCSS.extract(['css-loader', 'mcss-loader']),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'mcss-loader'],
      }),
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
      filename: 'nek-ui.js.map',
      columns: false,
    }),
    extractCSS,
  ],
};
