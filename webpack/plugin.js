const { writeFile } = require('fs');
const { dirname } = require('path');
const Del = require('del');
const mkdirp = require('mkdirp');

function WebpackPlugin(options) {
  this.options = options;
}

WebpackPlugin.prototype.apply = function apply(compiler) {
  const { clean, dry, dumpAssets } = this.options;

  compiler.plugin('run', function (compilation, callback) {
    Del(clean, { dryRun: dry }).then(() => {
      callback();
    });
  });
  if (dumpAssets) {
    compiler.plugin('emit', (compilation, cb) => {
      const css = Object.keys(compilation.assets).filter(filename => /\.css$/.test(filename));
      const js = Object.keys(compilation.assets).filter(filename => /\.js$/.test(filename)).sort();
      mkdirp.sync(dirname(dumpAssets));
      writeFile(dumpAssets, JSON.stringify({ css, js }), cb);
    });
  }
};

module.exports = WebpackPlugin;