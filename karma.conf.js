require('webpack');
const Os = require('os');
const Path = require('path');

const webpackConfig = require('./webpack/development.config.js')[1]; // using webpack UI config
const isTravis = !!process.env.TRAVIS;
const singleRun = isTravis;
const autoWatch = !isTravis;

//process.env.CHROME_BIN = process.env.CHROME_BIN || 'c:\\bin\\chrome-win32\\chrome.exe';
//process.env.PHANTOMJS_BIN = process.env.PHANTOMJS_BIN || 'c:\\bin\\phantomjs\\bin\\phantomjs.exe';

module.exports = function (config) {
  config.set({
    browsers: ['ChromeLauncher'],
    customLaunchers: {
      ChromeLauncher: {
        base: 'Chrome',
        flags: ['--incognito', '--no-sandbox']
      }
    },
    frameworks: ['mocha'],
    files: [
      './test/*.jsx'
    ],
    preprocessors: {
      './test/*.jsx': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    colors: true,
    retryLimit: 10,
    concurrency: Infinity,
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    autoWatch,
    singleRun,
  })
};
