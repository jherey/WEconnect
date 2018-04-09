const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  plugins: [
    // Extract imported CSS into own file
    new ExtractTextPlugin('bundle.css'),
    // Minify JS
    new UglifyJsPlugin({
      sourceMap: false,
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});