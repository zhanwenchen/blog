const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
// publicPath = '/build' because index.html requires a ./build/bundle.js
// const publicPath = '/build'; // Was workings except for appended localhost:8080/posts/new/build/bundle.js
const publicPath = '/';

module.exports = {
  // context: __dirname + '/src',
  entry: './src/App.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath,
  },
  devtool: '#eval-source-map',
  devServer: {
    // contentBase = '~/public/' so that index.html becomes the default html at GET '/'
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    port: 8080,
    historyApiFallback: true,
    // TODO: BLOG: NOTE that if you redirect every route, it will include the React index
    // route, so you won't be served React at all! Instead, proxy every browsers
    // path that is not '/'. But that could be problematic as well because
    // you cannot predict what other routes you are gonna have to manually make
    // into exceptions. Therefore it might be best to group all non-front-end
    // paths by prefixing all backend request by '/api'.
    proxy: {
      /**
       * @todo blog '/api': 'http://localhost:3000' will direct '/api/posts' to
       * 'localhost:3000/api/hosts. To avoid this, use 'pathRewrite'
       * @todo you must add a "/" at the end of the proxy target. Otherwise
       * webpack somehow proxies everything. But where did /posts come from
       * after I deleted everything still?
       */
      '/api/**': {
        target: 'http://[::1]:3000/',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ],
      },
    ],
  },
  watch: true,
};
