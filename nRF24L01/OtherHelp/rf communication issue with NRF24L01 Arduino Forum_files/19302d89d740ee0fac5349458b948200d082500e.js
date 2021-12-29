(function() {
  if ('require' in window) {
    require("discourse/lib/theme-settings-store").registerSettings(38, {"emoji_icon":"👩🏽‍💻","disable_at_trust_level":3,"sensitivity":0.5,"min_post_length_to_check":50,"max_post_length_to_check":-1,"include_html":true});
  }
})();
(function() {
  if ('Ember' in window) {
    Ember.TEMPLATES["javascripts/modal/ucd-warning-modal"] = Ember.HTMLBars.template({"id":null,"block":"{\"symbols\":[],\"statements\":[[4,\"d-modal-body\",null,[[\"rawTitle\"],[[28,\"ucd-modal-title\",null,null]]],{\"statements\":[[0,\"  \"],[1,[28,\"cook-text\",[[28,\"theme-i18n\",[38,\"warning_modal.content\"],null]],null],false],[0,\"\\n  \"],[7,\"label\",true],[10,\"for\",\"ucd_do-not-show-again\"],[10,\"class\",\"checkbox-label\"],[8],[0,\"\\n    \"],[1,[28,\"input\",null,[[\"type\",\"id\",\"name\",\"checked\"],[\"checkbox\",\"ucd_do-not-show-again\",\"ucd_do-not-show-again\",[24,[\"model\",\"ucd_shouldPermanentlyDismiss\"]]]]],false],[0,\"\\n    \"],[1,[28,\"theme-i18n\",[38,\"warning_modal.do_not_show_again\"],null],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"action-buttons\"],[8],[0,\"\\n    \"],[1,[28,\"d-button\",null,[[\"action\",\"icon\",\"tagName\",\"class\",\"label\"],[[28,\"action\",[[23,0,[]],\"goBackAndFix\"],null],\"pencil-alt\",\"button\",\"btn-primary\",[28,\"theme-prefix\",[38,\"warning_modal.fix_post\"],null]]]],false],[0,\"\\n    \"],[1,[28,\"d-button\",null,[[\"action\",\"tagName\",\"label\"],[[28,\"action\",[[23,0,[]],\"ignoreAndProceed\"],null],\"button\",[28,\"theme-prefix\",[38,\"warning_modal.ignore_and_post_anyway\"],null]]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}","meta":{}});
  }
})();

if ('define' in window) {
define("discourse/theme-38/unformatted-code-detector/core/code-energy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getCodeEnergyIndicators = _exports.codeEnergyValues = _exports.CodeEnergyLevels = void 0;

  var _codeEnergyValues, _codeEnergyIndicators2;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(38);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.38.".concat(key);
  };

  var varNameStart = "[$_a-zA-Z]";
  var varNameEnd = "[$_a-zA-Z0-9]*";
  var varName = "".concat(varNameStart).concat(varNameEnd);
  var varFragment = "[$a-zA-Z]".concat(varNameEnd); // no underscore at start

  var xmlLikeName = "[a-zA-Z-]+";
  var string = "(?:\"(?:[^\\n\"\\\\]|\\\\[^\\n])*\"|'(?:[^\\n'\\\\]|\\\\[^\\n])*')"; // adapted from http://wordaligned.org/articles/string-literals-and-regular-expressions

  var numeric = "-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?"; // adapted from https://www.json.org/

  var argument = "(?:".concat(varName, "|").concat(string, "|").concat(numeric, ")"); // ignoring complex values due to complexity;
  // bools, `null`s, and `undefined`s are already matched based on varName

  var argList = "(?:\\s*".concat(argument, "\\s*(?:,\\s*").concat(argument, "\\s*)*|\\s*)"); // matches 0 or more args; don't use on its own due to risk of infinite matches
  // enum

  var CodeEnergyLevels = {
    Complex: "Complex",
    High: "High",
    Medium: "Medium",
    Low: "Low"
  };
  _exports.CodeEnergyLevels = CodeEnergyLevels;
  var codeEnergyValues = (_codeEnergyValues = {}, _defineProperty(_codeEnergyValues, CodeEnergyLevels.Complex, 1), _defineProperty(_codeEnergyValues, CodeEnergyLevels.High, 0.7), _defineProperty(_codeEnergyValues, CodeEnergyLevels.Medium, 0.3), _defineProperty(_codeEnergyValues, CodeEnergyLevels.Low, 0.1), _codeEnergyValues);
  _exports.codeEnergyValues = codeEnergyValues;
  var nonHtmlIndicators = ["\\$".concat(varName), // almost certain to be var name
  "^\\s*\\.".concat(xmlLikeName), // CSS class selectors
  ":".concat(varName), // Ruby symbol
  // omitted: _varName starting with underscore (conflict with italics)
  "".concat(varFragment, "(?:_").concat(varFragment, ")+"), // snake_case
  // ommitted: camelCase and spinal-case (too many false positives)
  "(?:^|\\s+)(?:\\/\\/|;)", // single-line comment
  // omitted: python-style `#` single-line comments and CSS ID selectors (conflict with md headings)
  "\\/\\*[\\s\\S]+?\\*\\/", // C-like multiline comment
  "('''|\"\"\")[\\s\\S]+?\\1", // Python-like multiline string/comment
  ";\\s*$", // trailing semicolon
  "(?:".concat(varName, ")?[$_a-z]\\(").concat(argList, "\\)"), // function call
  // var name cannot end with uppercase to avoid `O(n)` false positive etc.
  "".concat(varName, "\\[\\s*").concat(argument, "?\\s*\\]"), // array index
  // omitted: object property (conflict with domain names, e.g. "google.com")
  "^\\s*[{}]\\s*$", // curly brace and nothing else on a line
  "\\{\\{.+\\}\\}", // templating languages e.g. Handlebars
  "[\\$#]\\{.+\\}", // template string
  "&&|!=|>>|<<|::|\\+=|-=|\\*=|\\/=|\\|\\|=|\\?=|\\.\\?", // various operators
  // omitted: ++ (conflict with C++, Notepad++, etc.)
  // omitted: || (conflict with empty table header row)
  "\\\\['\"ntr0\\\\]", // common escape sequences
  "<\\?[^>]*\\?>", // PHP
  "<%[^>]*%>", // ERB (Rails)
  "0000-00-00T00:00:00".split("0").join("\\d"), // ISO 8601 timestamps in logs
  "^\\s*at .+(.+)", // common stack trace format
  '^\\s*{\\s*"[^"]*"\\s*:' // single-line JSON property
  ];
  var htmlIndicators = ["<!--[\\s\\S]*?-->", // XML-like comment
  "<".concat(xmlLikeName, "[^>]*\\/?>"), // XML-like start/empty tag
  "</".concat(xmlLikeName, ">"), // XML-like end tag
  "&[0-9a-zA-Z]+;", // HTML entity - human-readable
  "&#[0-9]{1,7};", // HTML entity - decimal
  "&#x[0-9a-fA-F]{1,6};" // HTML entity - hex
  ];

  var _codeEnergyIndicators = (_codeEnergyIndicators2 = {}, _defineProperty(_codeEnergyIndicators2, CodeEnergyLevels.Complex, {
    get indicators() {
      return [nonHtmlIndicators, settings.include_html && htmlIndicators].filter(Boolean).flat();
    }

  }), _defineProperty(_codeEnergyIndicators2, CodeEnergyLevels.High, {
    // TODO
    indicators: [// "\\["
    ]
  }), _defineProperty(_codeEnergyIndicators2, CodeEnergyLevels.Medium, {
    // TODO
    indicators: [// ";"
    ]
  }), _defineProperty(_codeEnergyIndicators2, CodeEnergyLevels.Low, {
    // TODO
    value: 0.1,
    indicators: [// "."
    ]
  }), _codeEnergyIndicators2);

  var getCodeEnergyIndicators = function getCodeEnergyIndicators() {
    return Object.entries(_codeEnergyIndicators).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          indicators = _ref2[1].indicators;

      return indicators.map(function (source) {
        return {
          value: codeEnergyValues[key],
          matcher: new RegExp(source, "gm")
        };
      });
    }).flat();
  };

  _exports.getCodeEnergyIndicators = getCodeEnergyIndicators;
});
}

if ('define' in window) {
define("discourse/theme-38/unformatted-code-detector/core/detect-code", ["exports", "../helpers/boundaries", "./strip-ignored-content", "./code-energy", "./sensitivity"], function (_exports, _boundaries, _stripIgnoredContent, _codeEnergy, _sensitivity) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.detectUnformattedCode = _exports.printDebugInfo = _exports.numSequentialLinesWithThresholdCodeEnergy = _exports.getCodeEnergy = void 0;

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(38);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.38.".concat(key);
  };

  var getCodeEnergy = function getCodeEnergy(content) {
    var totalCodeEnergy = 0;
    var totalComplexMatches = 0;
    var lines = (0, _boundaries.getLineBoundaries)(content);
    lines.forEach(function (x) {
      x.matches = 0;
      x.matched_patterns = [];
    });

    var _iterator = _createForOfIteratorHelper((0, _codeEnergy.getCodeEnergyIndicators)()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _step.value,
            matcher = _step$value.matcher,
            value = _step$value.value;

        var matches = _toConsumableArray(content.matchAll(matcher));

        totalCodeEnergy += matches.length * value;

        if (value === _codeEnergy.codeEnergyValues[_codeEnergy.CodeEnergyLevels.Complex]) {
          totalComplexMatches += matches.length;
        }

        var _iterator2 = _createForOfIteratorHelper(matches),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var match = _step2.value;
            var startIndex = match.index;
            var endIndex = startIndex + match[0].length;

            var _iterator3 = _createForOfIteratorHelper(lines),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var line = _step3.value;
                var isThisLine = (0, _boundaries.isBetween)(line.start, line.end);

                if (isThisLine(startIndex) || isThisLine(endIndex) || line.start >= startIndex && line.end <= endIndex) {
                  ++line.matches;
                  line.matched_patterns.push({
                    matcher: matcher,
                    value: value
                  });
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return {
      totalCodeEnergy: totalCodeEnergy,
      totalComplexMatches: totalComplexMatches,
      lines: lines
    };
  };

  _exports.getCodeEnergy = getCodeEnergy;

  var numSequentialLinesWithThresholdCodeEnergy = function numSequentialLinesWithThresholdCodeEnergy(threshold) {
    return function (lines) {
      var maxContiguous = 0;
      var curContiguous = 0;

      var _iterator4 = _createForOfIteratorHelper(lines),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var line = _step4.value;
          // empty/whitespace-only lines don't affect contiguity
          if (!line.content.trim().length) continue;

          if (line.matches >= threshold) {
            ++curContiguous;
          } else {
            maxContiguous = Math.max(maxContiguous, curContiguous);
            curContiguous = 0;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return Math.max(maxContiguous, curContiguous);
    };
  };

  _exports.numSequentialLinesWithThresholdCodeEnergy = numSequentialLinesWithThresholdCodeEnergy;

  var printDebugInfo = function printDebugInfo(content) {
    content = (0, _stripIgnoredContent.stripIgnoredContent)(content);
    var complexMatchesToIgnore = _sensitivity.sensitivityConfig.complexMatchesToIgnore,
        minSequentialLinesToMatch = _sensitivity.sensitivityConfig.minSequentialLinesToMatch,
        minTotalCodeEnergy = _sensitivity.sensitivityConfig.minTotalCodeEnergy;

    var _getCodeEnergy = getCodeEnergy(content),
        totalCodeEnergy = _getCodeEnergy.totalCodeEnergy,
        totalComplexMatches = _getCodeEnergy.totalComplexMatches,
        lines = _getCodeEnergy.lines;

    var debugTable = [];
    var consecutive = 0;
    lines.forEach(function (l) {
      if (!l.content.trim()) return;

      if (l.matches) {
        consecutive++;
      } else {
        consecutive = 0;
      }

      debugTable.push([l.matches ? String(l.matches) : "", consecutive ? String(consecutive) : "", l.matched_patterns.length ? "`".concat(l.matched_patterns.map(function (p) {
        return p.matcher;
      }).join("`, `"), "`") : "", l.content]);
    });
    var columns = ["matches", "cumulative", "matched patterns", "content"];
    var dividers = columns.map(function () {
      return "";
    });
    columns.forEach(function (c, i) {
      var longest = Math.max.apply(Math, [c.length].concat(_toConsumableArray(debugTable.map(function (row) {
        return row[i].length;
      }))));
      debugTable.forEach(function (row) {
        return row[i] = row[i].padEnd(longest);
      });
      columns[i] = c.padEnd(longest);
      dividers[i] = dividers[i].padEnd(longest, "-");
    });
    debugTable.unshift(columns, dividers);
    console.log(debugTable.map(function (l) {
      return "| ".concat(l.join(" | "), " |");
    }).join("\n"));
    console.log("Result is ", {
      totalCodeEnergy: totalCodeEnergy,
      totalComplexMatches: totalComplexMatches,
      lines: lines
    });
    console.log("Sensitivity Config is ", {
      complexMatchesToIgnore: complexMatchesToIgnore,
      minSequentialLinesToMatch: minSequentialLinesToMatch,
      minTotalCodeEnergy: minTotalCodeEnergy
    });
  };

  _exports.printDebugInfo = printDebugInfo;

  var detectCode = function detectCode(content) {
    var complexMatchesToIgnore = _sensitivity.sensitivityConfig.complexMatchesToIgnore,
        minSequentialLinesToMatch = _sensitivity.sensitivityConfig.minSequentialLinesToMatch,
        minTotalCodeEnergy = _sensitivity.sensitivityConfig.minTotalCodeEnergy;

    var _getCodeEnergy2 = getCodeEnergy(content),
        totalCodeEnergy = _getCodeEnergy2.totalCodeEnergy,
        totalComplexMatches = _getCodeEnergy2.totalComplexMatches,
        lines = _getCodeEnergy2.lines;

    if (totalComplexMatches <= complexMatchesToIgnore) return false;
    if (totalCodeEnergy < minTotalCodeEnergy) return false;

    if (numSequentialLinesWithThresholdCodeEnergy(_codeEnergy.codeEnergyValues[_codeEnergy.CodeEnergyLevels.Complex])(lines) < minSequentialLinesToMatch) {
      return false;
    }

    return true;
  };

  var detectUnformattedCode = function detectUnformattedCode(content) {
    var strippedContent = (0, _stripIgnoredContent.stripIgnoredContent)(content);
    return (0, _boundaries.isBetween)(settings.min_post_length_to_check, settings.max_post_length_to_check === -1 ? Infinity : settings.max_post_length_to_check)(content.length) ? detectCode(strippedContent) : false;
  };

  _exports.detectUnformattedCode = detectUnformattedCode;
});
}

if ('define' in window) {
define("discourse/theme-38/unformatted-code-detector/core/sensitivity", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.sensitivityConfig = _exports.applySensitivity = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(38);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.38.".concat(key);
  };

  var applySensitivity = function applySensitivity(sensitivity) {
    return function (leastSensitive, mostSensitive) {
      return leastSensitive + sensitivity * (mostSensitive - leastSensitive);
    };
  };

  _exports.applySensitivity = applySensitivity;
  var sensitivityConfig = {
    get complexMatchesToIgnore() {
      return Math.round(applySensitivity(settings.sensitivity)(4, 0));
    },

    get minSequentialLinesToMatch() {
      return Math.round(applySensitivity(settings.sensitivity)(5, 1));
    },

    get minTotalCodeEnergy() {
      return Math.round(applySensitivity(settings.sensitivity)(5, 1));
    }

  };
  _exports.sensitivityConfig = sensitivityConfig;
});
}

if ('define' in window) {
define("discourse/theme-38/unformatted-code-detector/core/strip-ignored-content", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.stripIgnoredContent = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(38);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.38.".concat(key);
  };

  var ignoredContents = [// properly formatted code
  /(^([`~])\2{2,})[^`~\n]*\n[\s\S]*?\n\1\2*\s*(?:\n|$)/gm, // backtick-/tilde-fenced block
  /(?:^|(?:\n{2,}))\s*(?:(?: {4}|\t).*(?:\n|$))/g, // indented block
  // lack of `m` flag is intentional (`^` must match beginning of input, not line)
  /`[^`\n]+`/g, // inline backticks (must come after fenced code blocks)
  /\[([a-z]+).*?\][\s\S]*?\[\/\1\]/gim, // BBCode tags
  // URLs
  /https?:\/\/(_\([^() \n\t]+\)|[^() \n\t])+/g, // parens/underscores
  // for Wikipedia-style URLs
  // emojis
  /:[a-z_+-][a-z_0-9+-]*:/g, // descriptive style, e.g. :wink:, :stuck_out_tongue:
  /:D|:-D|:\)|:-\)|;\)|;-\)|:\(|:-\(|:o|:-o|:\?|:-\?|:\?\?\?:|8\)|8-\)|:x|:-x|:P|:-P|:!:|:\?:|:\||:-\||^_^|^__^|:'\(|:'-\(|:-'\(|:p|:O|:-O|:\/|;P|;-P|:\$|:-\$/g, // emoticon style, e.g. ;), :-P
  // per https://github.com/discourse/discourse/blob/dc6b547ed89f652b5406489d76140b76cf8e0d1d/script/import_scripts/phpbb3/support/smiley_processor.rb#L36-L63 and https://github.com/discourse/discourse/blob/0eeedf307a8f2a8e1ccd5b24dafbf5a7fd20e51e/lib/emoji/db.json#L7015-L7042
  // misc
  /\((?:c|tm|r)\)/gi, // copy/trademark/registered
  // markdown links and images
  /!?\[[^\]]+\]\([[^\)]+\)/g, // mentions (Prefixed by non-word and terminated at word boundary)
  /\B@[\w][\w.-]{0,58}\b/g];

  var stripIgnoredContent = function stripIgnoredContent(content) {
    var strippedContent = ignoredContents.reduce(function (str, ignoredContent) {
      return str.replace(ignoredContent, "");
    }, content);
    return strippedContent;
  };

  _exports.stripIgnoredContent = stripIgnoredContent;
});
}

if ('define' in window) {
define("discourse/theme-38/unformatted-code-detector/helpers/boundaries", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isBetween = _exports.getLineBoundaries = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(38);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.38.".concat(key);
  };

  var getLineBoundaries = function getLineBoundaries(str) {
    var lineBoundaries = [];
    var cursor = -1;

    do {
      lineBoundaries.push({
        start: cursor + 1
      });
      cursor = str.indexOf("\n", cursor + 1);
      lineBoundaries[lineBoundaries.length - 1].end = cursor === -1 ? str.length : cursor;
      lineBoundaries[lineBoundaries.length - 1].content = str.slice(lineBoundaries[lineBoundaries.length - 1].start, lineBoundaries[lineBoundaries.length - 1].end);
    } while (cursor > -1);

    return lineBoundaries;
  };

  _exports.getLineBoundaries = getLineBoundaries;

  var isBetween = function isBetween(start, end) {
    return function (point) {
      return point >= start && point <= end;
    };
  };

  _exports.isBetween = isBetween;
});
}

if ('define' in window) {
define("discourse/theme-38/unformatted-code-detector/helpers/emoji-diversity", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.randomizeEmojiDiversity = _exports.randomizeEmojiSkinTone = _exports.randomizeEmojiGender = void 0;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(38);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.38.".concat(key);
  };

  var genderEmojiData = {
    masc: {
      adult: "👨",
      child: "👦",
      modifier: "\u200D\u2642"
    },
    fem: {
      adult: "👩",
      child: "👧",
      modifier: "\u200D\u2640"
    } // no widespread support for most gender-neutral emoji sequences yet :(
    // neutral: {
    //   adult: "🧑",
    //   child: "🧒",
    //   modifier: "",
    // },

  };

  var randomGenderEmojiData = function randomGenderEmojiData() {
    var genders = Object.values(genderEmojiData);
    return genders[Math.floor(Math.random() * genders.length)];
  };

  var emojiRegexes = Object.keys(Object.values(genderEmojiData)[0]).reduce(function (regexInfo, subStrType) {
    regexInfo[subStrType] = new RegExp(Object.values(genderEmojiData).map(function (gender) {
      return gender[subStrType];
    }).filter(Boolean).join("|"), "g");
    return regexInfo;
  }, {});

  var randomizeEmojiGender = function randomizeEmojiGender(emoji) {
    return Object.entries(emojiRegexes).reduce(function (emoji, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          subStrType = _ref2[0],
          regex = _ref2[1];

      return emoji.replace(regex, function () {
        return randomGenderEmojiData()[subStrType];
      });
    }, emoji);
  };

  _exports.randomizeEmojiGender = randomizeEmojiGender;
  var MIN_SKIN_TONE_CODEPOINT = 0x1f3fb;
  var MAX_SKIN_TONE_CODEPOINT = 0x1f3ff;

  var randomizeEmojiSkinTone = function randomizeEmojiSkinTone(emoji) {
    return emoji.replace(/(?:\uD83C[\uDFFB-\uDFFF])/g, function () {
      return String.fromCodePoint(MIN_SKIN_TONE_CODEPOINT + Math.floor(Math.random() * (MAX_SKIN_TONE_CODEPOINT - MIN_SKIN_TONE_CODEPOINT + 1)));
    });
  };

  _exports.randomizeEmojiSkinTone = randomizeEmojiSkinTone;

  var randomizeEmojiDiversity = function randomizeEmojiDiversity(emoji) {
    return randomizeEmojiSkinTone(randomizeEmojiGender(emoji));
  };

  _exports.randomizeEmojiDiversity = randomizeEmojiDiversity;
});
}

if ('define' in window) {
define("discourse/theme-38/unformatted-code-detector/initializers/init", ["exports", "discourse/lib/plugin-api", "discourse/lib/show-modal", "../core/detect-code", "../helpers/emoji-diversity", "discourse/lib/text", "@ember/template", "discourse-common/lib/helpers", "I18n", "pretty-text/sanitizer"], function (_exports, _pluginApi, _showModal, _detectCode, _emojiDiversity, _text, _template, _helpers, _I18n, _sanitizer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(38);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.38.".concat(key);
  };

  var getDisableAtTrustLevel = function getDisableAtTrustLevel() {
    return settings.disable_at_trust_level === -1 ? Infinity : settings.disable_at_trust_level;
  }; // for testing/debugging:
  // localStorage.ucd_forceShowWarning = '1'


  var _default = {
    name: "unformatted-code-detector",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8.8", function (api) {
        window.debugUnformattedCodeDetector = function () {
          var _document$querySelect;

          var content = (_document$querySelect = document.querySelector("#reply-control textarea.d-editor-input")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value;

          if (!content) {
            console.log("No content found");
          } else {
            (0, _detectCode.printDebugInfo)(content);
          }
        };

        (0, _helpers.registerUnbound)("ucd-modal-title", function () {
          return (0, _template.htmlSafe)([(0, _text.emojiUnescape)((0, _sanitizer.escape)((0, _emojiDiversity.randomizeEmojiDiversity)(settings.emoji_icon))), (0, _sanitizer.escape)(_I18n.default.t(themePrefix("warning_modal.title")))].join(" "));
        });
        api.modifyClass("model:composer", {
          pluginId: "unformatted-code-detector",
          ucd_shouldPermanentlyDismiss: false,
          ucd_checkPermanentlyDismissed: function ucd_checkPermanentlyDismissed() {
            return !!localStorage.ucd_warningPermanentlyDismissed;
          },
          ucd_checkShouldIgnoreWarning: function ucd_checkShouldIgnoreWarning() {
            if (localStorage.ucd_forceShowWarning) return false;
            return this.ucd_previousWarningIgnored || this.ucd_checkPermanentlyDismissed() || api.getCurrentUser().trust_level >= getDisableAtTrustLevel();
          },
          ucd_checkUnformattedCodeDetected: function ucd_checkUnformattedCodeDetected() {
            return (0, _detectCode.detectUnformattedCode)(this.reply);
          }
        });
        api.modifyClass("controller:composer", {
          pluginId: "unformatted-code-detector",
          ucd_permanentlyDismiss: function ucd_permanentlyDismiss() {
            localStorage.ucd_warningPermanentlyDismissed = "1";
          },
          ucd_closeModal: function ucd_closeModal() {
            if (this.model.ucd_shouldPermanentlyDismiss) {
              this.ucd_permanentlyDismiss();
            }

            this.send("closeModal");
          },
          save: function save() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var model = this.model;

            var _this = this;

            var _super = this._super;

            if (model.ucd_checkUnformattedCodeDetected() && !model.ucd_checkShouldIgnoreWarning()) {
              var warningModal = (0, _showModal.default)("ucdWarningModal", {
                modalClass: "ucd_warning-modal",
                model: model
              });

              warningModal.actions.ignoreAndProceed = function () {
                _this.ucd_closeModal.call(_this);

                _super.call.apply(_super, [_this].concat(args));
              };

              warningModal.actions.goBackAndFix = function () {
                return _this.ucd_closeModal.call(_this);
              };
            } else {
              this._super.apply(this, args);
            }
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}

