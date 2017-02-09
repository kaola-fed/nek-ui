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
    loaders: [{
        test: /\.html$/,
        loader: 'text-loader'
      },
      {
        test: /\.mcss$/,
        loader: 'style!css!mcss'
      }
    ]
  },
  resolve: {
    alias: {
      'bowser': __dirname + '/node_modules/bowser'
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "nek-ui.js.map",
      columns: false
    })
  ]
}