const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const declarations = require('./declarations');
const bundles = require('./bundles');
const helpers = require('./helpers');
const base = require('./base');

function devServer() {
  return {
    plugins: [new webpack.HotModuleReplacementPlugin({ multiStep: true })],
    devServer: {
      inline: true,
      hot: true,
      historyApiFallback: true,
      stats: 'errors-only',
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  };
}

function generateHtml() {
  return {
    plugins: [
      new Html({
        title: 'Example project',
        template: path.join(declarations.paths.src, 'template.html'),
      }),
    ],
  };
}

function optimizeForProd() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { drop_console: true },
        mangle: {
          except: ['webpackJsonp'],
          screw_ie8: true,
        },
      }),
      new webpack.optimize.DedupePlugin(),
    ],
  };
}

module.exports = Object.assign(base, declarations, bundles, helpers, {
  devServer,
  generateHtml,
  optimizeForProd,
});
