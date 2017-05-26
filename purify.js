const fs = require('fs');

module.exports = function(fileBody, fileName) {
  let newFileBody = fileBody
      /* wrap TS 2.2 enums w/ an IIFE */
      .replace(
          /var (\S+) = \{\};\n(\1\.(\S+) = \d+;\n)+\1\[\1\.(\S+)\] = "\4";\n(\1\[\1\.(\S+)\] = "\S+";\n*)+/mg,
          'var $1 = /*@__PURE__*/(function() {\n$&; return $1;})();\n'
      )
      /* wrap TS 2.3 enums w/ an IIFE */
      .replace(
          /var (\S+);\n\(function \(\1\) \{\s+(\1\[\1\["(\S+)"\] = 0\] = "\3";(\s+\1\[\1\["\S+"\] = \d\] = "\S+";)*\n)\}\)\(\1 \|\| \(\1 = \{\}\)\);/mg,
          'var $1 = /*@__PURE__*/(function() {\n    var $1 = {};\n    $2    return $1;\n})();'
      )
      /* strip __extends helper */
      .replace(
          /^var __extends = \(.*\n(    .*\n)*\};*(\)\(\);)*/mg,
          '\n\n\n\n\n'
      )
      /* strip __decorate helper */
      .replace(
          /^var __decorate = \(.*\n(    .*\n)*\};\n/mg,
          '\n\n\n\n\n\n'
      )
      /* strip __metadata helper */
      .replace(
          /^var __metadata = \(.*\n(    .*\n)*\};\n/mg,
          '\n\n\n\n\n\n'
      )
      /* strip __param helper */
      .replace(
          /^var __param = \(.*\n(    .*\n)*\};\n/mg,
          '\n\n\n'
      )
      /* strip all license headers / comments */
      .replace(
          /\/\*\*\n\s+\* @license.*\n(\s+\*[^\/].*\n)*\s+\*\//mg,
          '\n'
      );

  if (fileName.startsWith('polyfills.')) {
    newFileBody += '\n\n' + fs.readFileSync('node_modules/tslib/tslib.js').toString();
  }

  return newFileBody;
};
