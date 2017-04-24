
const Path = require('path');
const { optimize, HashedModuleIdsPlugin } = require('webpack');
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
        'prop-types',
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        'redux',
        'react-redux',
        'react-helpful',
        'react-intl',
        'redux-thunk',
        'styled-components',
      ],
    },
    plugins: [
      new optimize.UglifyJsPlugin({
        sourceMap: false,
        minimize: true,
        compress: {
          warnings: false,
        },
      }),
      new optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new HashedModuleIdsPlugin(),
      new AppCachePlugin({
        settings: ['prefer-offline'],
        output: 'manifest.appcache',
      }),
    ]
  },
].map((config, idx) => merge(baseConfigs[idx], config));
