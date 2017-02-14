var webpack = require('webpack');

module.exports = {
  output: {
    filename: 'nek-ui.js',
    library: 'NEKUI',
    libraryTarget: 'umd'
  },
  externals: {
    'regularjs': {
      root: "Regular",
      amd: "Regular",
      commonjs: "regularjs"
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.html$/,
        loader: 'text-loader'
      },
      {
        test: /\.mcss$/,
        loader: 'style!css!mcss'
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "nek-ui.js.map",
      columns: false
    })
  ]
}