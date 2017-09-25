const Path = require('path');
const { DefinePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractPostCss = new ExtractTextPlugin('css/[name].css');
const Copy = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackPlugin = require('./plugin.js');

const env = process.env.NODE_ENV;

const define = new DefinePlugin({
  'DEBUG': JSON.stringify(true),
  'process.env': {
    'NODE_ENV': JSON.stringify(env),
  },
});

module.exports = [
  {
    output: {
      path: Path.join(__dirname, '../build'),
      filename: '[name].js',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', options: { cacheDirectory: 'cache' } },
        { test: /\.(svg|jpg|jpeg|png|gif|webp)$/, loader: 'file-loader', options: { name: 'images/[name].[ext]', emitFile: false } },
        { test: /\.(css|woff(2)?|ttf|eot)$/, loader: 'null-loader' },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      define,
    ],
  },
  {
    output: {
      path: Path.join(__dirname, '../build/www'),
      filename: 'js/[name].js',
    },
    module: {
      rules: [
        //{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader', enforce: 'pre' },
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', options: { cacheDirectory: 'cache' } },
        { test: /\.css$/, loader: ExtractPostCss.extract({ use: ['css-loader', 'postcss-loader'], publicPath: '/' }) },
        { test: /\.(svg|jpg|png|gif)$/, loader: 'file-loader', options: { name: 'images/[name].[ext]' } },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: { name: 'fonts/[name].[ext]', limit: 5000, mimetype: 'application/font-woff' }
        },
        { test: /\.ttf$|\.eot$/, loader: 'file-loader', options: { name: 'fonts/[name].[ext]' } }

      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new WebpackPlugin({
        clean: ['build', 'cache'],
      }),
      define,
      ExtractPostCss,
      new Copy([
        { from: './src/favicon.ico', to: './' },
        { from: './src/data', to: './data' }
      ]),
    ],
  },
];