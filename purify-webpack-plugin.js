const purify= require('./purify');

function PurifyPlugin(options) {
  console.log('purify plugin init');
}

PurifyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
      chunks.forEach(function(chunk) {
        chunk.files.filter((fileName) => fileName.endsWith('.bundle.js')).forEach((fileName)  => {
          console.log(`purifying ${fileName}`);

          const purifiedSource = purify(compilation.assets[fileName].source());
          compilation.assets[fileName]._cachedSource = purifiedSource;
          compilation.assets[fileName]._source.source = () => purifiedSource;
        });
      });
      callback();
    });
  });
};

module.exports = PurifyPlugin;
