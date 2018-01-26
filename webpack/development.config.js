const Path = require('path');
const merge = require('webpack-merge');
const baseConfigs = require('./base.config');
const { NamedModulesPlugin } = require('webpack');

module.exports = [
  {
    devtool: 'source-map',
    entry: {
      'server': Path.resolve(__dirname, '../src/app/server.js'),
    },
  },
  {
    devtool: 'source-map',
    entry: {
      'index': Path.resolve(__dirname, '../src/app/client.js'),
    },
    plugins: [
      new NamedModulesPlugin(),
    ]
  },
].map((config, idx) => merge(baseConfigs[idx], config));