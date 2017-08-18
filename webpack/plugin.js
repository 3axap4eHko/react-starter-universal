const Del = require('del');

function WebpackPlugin(options) {
  this.options = options;
}

WebpackPlugin.prototype.apply = function apply(compiler) {
  const { clean, dry } = this.options;

  compiler.plugin('run', function (compilation, callback) {
    Del(clean, { dryRun: dry }).then(() => {
      callback();
    });
  });

  compiler.plugin('emit', (compilation, callback) => {
    const chunks = compilation
      .getStats()
      .toJson()
      .chunks
      .filter(chunk => chunk.names[0] && ((typeof chunk.isInitial !== 'function' && chunk.initial) || chunk.isInitial()));
    console.log(chunks.files);
    callback();
  });

  compiler.plugin('compilation', function (compilation) {


  });
};

module.exports = WebpackPlugin;