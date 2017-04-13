const Path = require('path');
const merge = require('webpack-merge');
const baseConfigs = require('./base.config');

module.exports = [
  {
    devtool: 'source-map',
    entry: {
      'server': Path.resolve(__dirname, '../src/app/server.jsx'),
    },
  },
  {
    devtool: 'source-map',
    entry: {
      'index': Path.resolve(__dirname, '../src/app/client.jsx'),
    },
  },
].map((config, idx) => merge(baseConfigs[idx], config));