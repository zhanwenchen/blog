var webpack = require('webpack');
var path = require('path');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
var publicPath = '/';

module.exports = {
  // context: __dirname + '/src',
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    // publicPath = '/build' because index.html requires a ./build/bundle.js
    publicPath: '/build',
  },
  devServer: {
    // contentBase = '~/public/' so that index.html becomes the default html at GET '/'
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader')
        ]
      }
    ]
  }
}
