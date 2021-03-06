
const Path = require('path');
const { HashedModuleIdsPlugin } = require('webpack');
const merge = require('webpack-merge');

const baseConfigs = require('./base.config');

module.exports = [
  {
    mode: 'production',
    entry: {
      'server': Path.resolve(__dirname, '../src/app/server.js'),
    },
  },
  {
    mode: 'production',
    entry: {
      'index': Path.resolve(__dirname, '../src/app/client.js'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new HashedModuleIdsPlugin(),
    ]
  },
].map((config, idx) => merge(baseConfigs[idx], config));
