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
    port: 8080,
    // TODO: BLOG: NOTE that if you redirect every route, it will include the React index
    // route, so you won't be served React at all! Instead, proxy every browsers
    // path that is not '/'. But that could be problematic as well because
    // you cannot predict what other routes you are gonna have to manually make
    // into exceptions. Therefore it might be best to group all non-front-end
    // paths by prefixing all backend request by '/api'.
    proxy: {
      /**
       * @todo '/api': 'http://localhost:3000' will direct '/api/posts' to
       * 'localhost:3000/api/hosts. To avoid this, use 'pathRewrite'
       *
       */
      '/api': {
        target: 'http://localhost:3000/',
        pathRewrite: {'^/api' : ''},
      }
    },
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
