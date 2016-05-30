var webpack = require('webpack');
var autoprefixer = require('autoprefixer')
module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/app',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './app',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: function() {
    return [autoprefixer]
  }
};
