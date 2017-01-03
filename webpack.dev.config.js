'use strict';

const Path = require('path');
const {DefinePlugin} = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractPostCss = new ExtractTextPlugin('/css/[name].css');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackPlugin = require('./webpack.plugin');

module.exports = [
    {
        devtool: 'source-map',
        entry: {
            'server' : Path.resolve(__dirname, './src/app/server.jsx')
        },
        output: {
            path: Path.join(__dirname, 'build/www'),
            filename: '../[name].js',
            chunkFilename: '../[id].js'
        },
        target: 'node',
        externals: [nodeExternals()],
        module: {
            preLoaders: [
                { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ },
            ],
            loaders: [
                { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: {cacheDirectory: 'cache'} },
                { test: /\.css$/, loaders: ['css-loader', 'postcss-loader'] },
                { test: /\.(svg|jpg|png|gif)$/, loader: 'file-loader', query: { name: 'images/[hash].[ext]' } },
                { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { name: 'fonts/[hash].[ext]', limit: 5000, mimetype: 'application/font-woff' } },
                { test: /\.ttf$|\.eot$/, loader: 'file-loader', query: { name: 'fonts/[hash].[ext]' } }
            ],
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        plugins: [
            new DefinePlugin({
                '__DEV__': JSON.stringify(true),
                'DEBUG': JSON.stringify(true),
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            })
        ]
    },
    {
        devtool: 'source-map',
        entry: {
            'index' : Path.resolve(__dirname, './src/app/client.jsx')
        },
        output: {
            path: Path.join(__dirname, 'build/www'),
            filename: '/js/[name].js',
            chunkFilename: '/js/[id].js'
        },
        module: {
            preLoaders: [
                { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ },
            ],
            loaders: [
                { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
                { test: /\.css$/, loader: ExtractPostCss.extract(['css-loader', 'postcss-loader']) },
                { test: /\.(svg|jpg|png|gif)$/, loader: 'file-loader', query: { name: 'images/[hash].[ext]' } },
                { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { name: 'fonts/[hash].[ext]', limit: 5000, mimetype: 'application/font-woff' } },
                { test: /\.ttf$|\.eot$/, loader: 'file-loader', query: { name: 'fonts/[hash].[ext]' } }
            ],
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        plugins: [
            new DefinePlugin({
                '__DEV__': JSON.stringify(true),
                'DEBUG': JSON.stringify(true),
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            ExtractPostCss,
            new Html({
                filename: 'index.html',
                template: 'src/index.html'
            }),
            new WebpackPlugin({
                clean: ['build', 'cache']
            }),
            new Copy([
                {from: './src/favicon.ico', to: './'},
                {from: './src/vendor/', to: './vendor'},
            ])
        ]
    }
];