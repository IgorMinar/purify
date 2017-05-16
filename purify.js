module.exports = function(fileBody, fileName) {
    return fileBody
      /* prefix downleveled classes w/ the @__PURE__ annotation */
      .replace(
          /^(var (\S+) = )(\(function \(\) \{\n(?:    (?:\/\*\*| \*|\*\/|\/\/)[^\n]*\n)*    function \2\([^\)]*\) \{\n)/mg,
          '$1/*@__PURE__*/$3'
      )
      /* prefix downleveled classes that extend another class w/ the @__PURE__ annotation */
      .replace(
          /^(var (\S+) = )(\(function \(_super\) \{\n    __extends\(\2, _super\);\n)/mg,
          '$1/*@__PURE__*/$3'
      )
        /* strip __extends helper */
        .replace(
            /^var __extends = \(.*\n(    .*\n)*\};\n/mg,
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
            /\/\*\*\n \* @license.*\n( \*[^/].*\n)* \*\//mg,
            '\n'
        )
};
