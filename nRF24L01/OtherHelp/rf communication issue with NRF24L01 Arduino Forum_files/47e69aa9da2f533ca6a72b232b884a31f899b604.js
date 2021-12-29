if ('define' in window) {
define("discourse/theme-38/pre-initializers/theme-38-translations", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: "theme-38-translations",
    initialize: function initialize() {
      /* Translation data for theme 38 (en)*/
      var data = {
        "en": {
          "warning_modal": {
            "title": "Are you posting code?",
            "content": "It looks like your post may contain code or logs. To keep your post readable, please remember to **format your code** using the code toolbar button <kbd></></kbd>, or the backtick <kbd>`</kbd> key on your keyboard, like so:\n\n`` `single line` ``\n\n````\n```\nmultiple\nlines\n```\n````\n",
            "do_not_show_again": "don’t show this message again",
            "fix_post": "Edit Post",
            "ignore_and_post_anyway": "Post Anyway"
          }
        }
      };

      for (var lang in data) {
        var cursor = I18n.translations;

        for (var _i = 0, _arr = [lang, "js", "theme_translations"]; _i < _arr.length; _i++) {
          var key = _arr[_i];
          cursor = cursor[key] = cursor[key] || {};
        }

        cursor[38] = data[lang];
      }
    }
  };
  _exports.default = _default;
});
}
