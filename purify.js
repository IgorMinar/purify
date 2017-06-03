const fs = require('fs');

// This matches a comment left by the ngo-loader that contains pure import paths
const importCommentRegex = /\/\*\* PURE_IMPORTS_START (\S+) PURE_IMPORTS_END \*\//mg;

module.exports = function(fileBody, fileName) {

  const pureImportMatches = getMatches(fileBody, importCommentRegex, 1).join('|');

  let newFileBody = fileBody
      /* wrap TS 2.2 enums w/ an IIFE */
      .replace(
          /var (\S+) = \{\};\n(\1\.(\S+) = \d+;\n)+\1\[\1\.(\S+)\] = "\4";\n(\1\[\1\.(\S+)\] = "\S+";\n*)+/mg,
          'var $1 = /*@__PURE__*/(function() {\n$&; return $1;})();\n'
      )
      /* wrap TS 2.3 enums w/ an IIFE */
      .replace(
          /var (\S+);(\/\*__PURE__\*\/)*\n\(function \(\1\) \{\s+(\1\[\1\["(\S+)"\] = 0\] = "\4";(\s+\1\[\1\["\S+"\] = \d\] = "\S+";)*\n)\}\)\(\1 \|\| \(\1 = \{\}\)\);/mg,
          'var $1 = /*@__PURE__*/(function() {\n    var $1 = {};\n    $3    return $1;\n})();'
      )
      /* Prefix safe imports with pure */
      .replace(
          new RegExp(`(_(${pureImportMatches})__ = )(__webpack_require__\\("\\S+"\\));`, 'mg'),
          '$1/*@__PURE__*/$3'
      )
      /* Prefix default safe imports with pure */
      .replace(
          new RegExp(`(_(${pureImportMatches})___default = )(__webpack_require__\\.\\w\\(\\S+\\));`, 'mg'),
          '$1/*@__PURE__*/$3'
      )
      /* Prefix CCF and CMF statements */
      .replace(
          /__WEBPACK_IMPORTED_MODULE_0__angular_core__\["_\w+" \/\* (ɵccf|ɵcmf) \*\/\]\(/mg,
          '/*@__PURE__*/$&'
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

function getMatches(str, regex, index) {
    var matches = [];
    var match;
    while(match = regex.exec(str)) {
        matches = matches.concat(match[index].split(','));
    }
    return matches;
}
