/* eslint-disable */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
