'use strict';

const Del = require('del');

function WebpackPlugin(options) {
    this.options = options;
}

WebpackPlugin.prototype.apply = function apply(compiler) {
    const {clean, dry} = this.options;

    compiler.plugin('run', function(compilation, callback) {
        Del(clean, {dryRun: dry}).then(() => {
            callback();
        });
    });

    compiler.plugin('compilation', function(compilation) {
        // move index.html to level upper
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            htmlPluginData.plugin.childCompilationOutputName = '../'+htmlPluginData.plugin.childCompilationOutputName;
            callback(null, htmlPluginData);
        });

    });
};

module.exports = WebpackPlugin;