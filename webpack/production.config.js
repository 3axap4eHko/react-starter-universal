
const Path = require('path');
const { optimize } = require('webpack');
const merge = require('webpack-merge');
const AppCachePlugin = require('appcache-webpack-plugin');

const baseConfigs = require('./base.config');

module.exports = [
  {
    entry: {
      'server': Path.resolve(__dirname, '../src/app/server.jsx'),
    },
    plugins: [
      new optimize.UglifyJsPlugin({
        sourceMap: false,
        minimize: true,
        compress: {
          warnings: false,
        },
      }),
    ],
  },
  {
    entry: {
      'index': Path.resolve(__dirname, '../src/app/client.jsx'),
      'common': [
        'react',
        'react-dom',
        'react-router',
        'redux',
        'react-redux',
        'react-helpful',
        'react-intl',
        'redux-thunk'],
    },
    plugins: [
      new optimize.UglifyJsPlugin({
        sourceMap: false,
        minimize: true,
        compress: {
          warnings: false,
        },
      }),
      new optimize.CommonsChunkPlugin('common', 'js/common.js'),
      new AppCachePlugin({
        settings: ['prefer-offline'],
        output: 'manifest.appcache',
      }),
    ]
  },
].map((config, idx) => merge(baseConfigs[idx], config));
