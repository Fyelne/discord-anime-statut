const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    background: path.resolve(__dirname, 'src', 'background.js'),
    options: path.resolve(__dirname, 'src', 'options.js'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './assets', to: './' } 
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-object-rest-spread'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true, // Enable minimization
    minimizer: [new TerserWebpackPlugin()], // Use TerserWebpackPlugin for minification
  },
  devtool: 'source-map',
};
