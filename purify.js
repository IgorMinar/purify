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
        /* prefix new Optional/SkipSelf/InjectionToken/Inject w/ the @__PURE__ annotation */
        .replace(
            /new __WEBPACK_IMPORTED_MODULE_\w+__angular_core__\["\w+" \/\* (Optional|SkipSelf|InjectionToken|Inject) \*\/]/mg,
            '/*@__PURE__*/$&'
        )
        /* prefix all forwardRef callsites w/ the @__PURE__ annotation */
        .replace(
            /__webpack_require__\.\w+\(__WEBPACK_IMPORTED_MODULE_\w+__angular_core__\["[^"]+" \/\* forwardRef \*\/\]\)\(function \(\) \{/mg,
            '/*@__PURE__*/$&'
        )
        /* prefix all mixinDisabled callsites w/ the @__PURE__ annotation */
        .replace(
            /mixinDisabled\(Md\S+\)/mg,
            '/*@__PURE__*/$&'
        )
        /* prefix new OverlayState/ConnectionPositionPair w/ the @__PURE__ annotation */
        .replace(
            /new (OverlayState|ConnectionPositionPair)\(/mg,
            '/*@__PURE__*/$&'
        )
        /* prefix all animation trigger() callsites w/ the @__PURE__ annotation */
        .replace(
            /__webpack_require__\.\w+\(__WEBPACK_IMPORTED_MODULE_\w+__angular_animations__\["[^"]+" \/\* trigger \*\/\]\)\(['"][^"]+['"]/mg,
            '/*@__PURE__*/$&'
        )
        /* prefix all animation state() callsites w/ the @__PURE__ annotation */
        .replace(
            /__webpack_require__\.\w+\(__WEBPACK_IMPORTED_MODULE_\w+__angular_animations__\["[^"]+" \/\* state \*\/\]\)\(['"][^"]+['"]/mg,
            '/*@__PURE__*/$&'
        )
        /* prefix all animation style() callsites w/ the @__PURE__ annotation */
        .replace(
            /__webpack_require__\.\w+\(__WEBPACK_IMPORTED_MODULE_\w+__angular_animations__\["[^"]+" \/\* style \*\/\]\)\(\{/mg,
            '/*@__PURE__*/$&'
        )
        /* prefix all animation transition() callsites w/ the @__PURE__ annotation */
        .replace(
            /__webpack_require__\.\w+\(__WEBPACK_IMPORTED_MODULE_\w+__angular_animations__\["[^"]+" \/\* transition \*\/\]\)\(['"][^"]+['"]/mg,
            '/*@__PURE__*/$&'
        )
        /* prefix all animation animate() callsites w/ the @__PURE__ annotation */
        .replace(
            /__webpack_require__\.\w+\(__WEBPACK_IMPORTED_MODULE_\w+__angular_animations__\["[^"]+" \/\* animate \*\/\]\)\(['"][^"]+['"]/mg,
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
            /\/\*\*\n \* @license.*\n( \*[^/].*\n)* \*\//mg,
            '\n'
        )
};
