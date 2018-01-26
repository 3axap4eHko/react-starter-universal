
const Path = require('path');
const { optimize, HashedModuleIdsPlugin } = require('webpack');
const merge = require('webpack-merge');

const baseConfigs = require('./base.config');

module.exports = [
  {
    entry: {
      'server': Path.resolve(__dirname, '../src/app/server.js'),
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
      'index': Path.resolve(__dirname, '../src/app/client.js'),
      'common': [
        'prop-types',
        'classnames',
        'react',
        'react-dom',
        'react-helmet',
        'react-jss',
        'react-steersman',
        'redux',
        'react-redux',
        'redux-thunk',
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
    ]
  },
].map((config, idx) => merge(baseConfigs[idx], config));
