(function() {
  if ('require' in window) {
    require("discourse/lib/theme-settings-store").registerSettings(2, {"svg_icons":"fab-youtube|fab-linkedin-in|fab-facebook-f","theme_uploads":{"icons-sprite":"https://aws1.discourse-cdn.com/arduino/original/3X/5/2/5216ddd8fb2265b117cde44bca7cba571a9313bc.svg","svg-close":"https://aws1.discourse-cdn.com/arduino/original/3X/e/c/ec18a2369593199dd4fb999f8af357993b79789b.svg","svg-device-manager":"https://aws1.discourse-cdn.com/arduino/original/3X/d/2/d26759ae4d0564fb0f223d801c5b1ded6ddb5283.svg","svg-iot-cloud":"https://aws1.discourse-cdn.com/arduino/original/3X/6/d/6deba2a42824fdb721f3f5868e42988277718e3a.svg","svg-web-editor":"https://aws1.discourse-cdn.com/arduino/original/3X/6/c/6ccb07efdc83c96cfa45eccf0323305461658ed0.svg","typoninesans-regular":"https://aws1.discourse-cdn.com/arduino/original/3X/3/d/3d65f8b624b550a1377c11e84e79db86f410ed4e.woff","typsansmono-regular":"https://aws1.discourse-cdn.com/arduino/original/3X/b/8/b8362c60f30f0363c8f965ef94c0bb6f60651e61.woff"}});
  }
})();
(function() {
  if ('Ember' in window) {
    Ember.TEMPLATES["javascripts/arduino/connectors/above-footer/footer"] = Ember.HTMLBars.template({"id":null,"block":"{\"symbols\":[],\"statements\":[[4,\"if\",[[24,[\"showFooter\"]]],null,{\"statements\":[[0,\"  \"],[1,[28,\"arduino-footer\",null,[[\"showFooter\",\"model\"],[[24,[\"showFooter\"]],[28,\"hash\",null,[[\"model\"],[[24,[\"model\"]]]]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}","meta":{}});
  }
})();

if ('define' in window) {
define("discourse/theme-2/components/arduino-footer", ["exports", "@ember/component", "discourse-common/utils/decorators", "discourse/lib/plugin-api", "@ember/service", "discourse/models/topic", "discourse/lib/url"], function (_exports, _component, _decorators, _pluginApi, _service, _topic, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = _component.default.extend({
    router: (0, _service.inject)(),
    currentRouteName: null,
    _jumpType: function _jumpType() {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      if (this.router.currentRouteName === "topic.fromParamsNear" || this.router.currentRouteName === "topic.fromParams") {
        this.set("jumpType", "topic");
      } else {
        this.set("jumpType", "other");
      }
    },
    actions: {
      jumpTop: function jumpTop() {
        if (this.jumpType === "topic") {
          var url = window.location.pathname.split("/");
          var topURL = url[0] + "/" + url[1] + "/" + url[2] + "/" + url[3];

          _url.default.routeTo(topURL);
        } else {
          $("html, body").animate({
            scrollTop: 0
          }, "fast");
        }
      }
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      this.appEvents.on("page:changed", this, "_jumpType");
    }
  });

  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/arduino-header", ["exports", "discourse/lib/plugin-api", "virtual-dom"], function (_exports, _pluginApi, _virtualDom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "arduino-header",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8", function (api) {
        api.decorateWidget("header-contents:before", function (helper) {
          return helper.attach("arduino-nav");
        });
        api.decorateWidget("header-buttons:before", function (helper) {
          var showExtraInfo = helper.attrs.topic;

          if (!showExtraInfo) {
            document.querySelector("body").classList.remove("show-extra-info");
            return helper.attach("arduino-discourse-nav");
          } else {
            document.querySelector("body").classList.add("show-extra-info");
          }
        });
        api.createWidget("arduino-discourse-nav", {
          tagName: "div.arduino-discourse-nav",
          buildKey: function buildKey() {
            return "arduino-discourse-nav";
          },
          lookupCount: function lookupCount(type) {
            var tts = this.register.lookup("topic-tracking-state:main");
            return tts ? tts.lookupCount(type) : 0;
          },
          html: function html() {
            var navItems = [];
            var currentUser = api.getCurrentUser();
            navItems.push((0, _virtualDom.h)("li.filter-categories", (0, _virtualDom.h)("a", {
              href: "/categories"
            }, "Categories")));
            navItems.push((0, _virtualDom.h)("li.filter-latest", (0, _virtualDom.h)("a", {
              href: "/latest"
            }, "Latest")));

            if (currentUser) {
              var newItems;
              var unreadItems;

              if (this.lookupCount("new") > 0) {
                newItems = this.lookupCount("new");
                navItems.push((0, _virtualDom.h)("li.filter-new", (0, _virtualDom.h)("a", {
                  href: "/new"
                }, "New (" + newItems + ")")));
              }

              if (this.lookupCount("unread") > 0) {
                unreadItems = this.lookupCount("unread");
                navItems.push((0, _virtualDom.h)("li.filter-unread", (0, _virtualDom.h)("a", {
                  href: "/unread"
                }, "Unread (" + unreadItems + ")")));
              }
            }

            navItems.push((0, _virtualDom.h)("li.filter-about", (0, _virtualDom.h)("a", {
              href: "/about"
            }, "About")));
            navItems.push((0, _virtualDom.h)("li.filter-faq", (0, _virtualDom.h)("a", {
              href: "/faq"
            }, "FAQ")));
            return (0, _virtualDom.h)("ul", [navItems]);
          }
        });
        api.createWidget("arduino-nav", {
          tagName: "div.arduino-nav-top",
          buildKey: function buildKey() {
            return "arduino-nav";
          },
          html: function html(attrs, state) {
            return (0, _virtualDom.h)("div.wrap", [this.attach("arduino-header-links"), this.attach("arduino-search-wrapper"), this.attach("arduino-grid-button"), this.attach("arduino-login-button"), (0, _virtualDom.h)("div.arduino-user-placeholder")]);
          }
        });
        api.createWidget("arduino-header-links", {
          tagName: "div.arduino-header-links",
          buildKey: function buildKey() {
            return "arduino-header-links";
          },
          html: function html() {
            return (0, _virtualDom.h)("ul", [(0, _virtualDom.h)("li", (0, _virtualDom.h)("a", {
              href: "https://arduino.cc"
            }, [(0, _virtualDom.h)("span", "Arduino"), (0, _virtualDom.h)("span", ".cc")])), (0, _virtualDom.h)("li", [(0, _virtualDom.h)("a", {
              href: "https://arduino.cc/pro"
            }, [(0, _virtualDom.h)("span", "Pro"), (0, _virtualDom.h)("span", "fessional")])]), (0, _virtualDom.h)("li", [(0, _virtualDom.h)("a", {
              href: "https://arduino.cc/education"
            }, [(0, _virtualDom.h)("span", "Edu"), (0, _virtualDom.h)("span", "cation")])]), (0, _virtualDom.h)("li", [(0, _virtualDom.h)("a", {
              href: "https://store.arduino.cc"
            }, "Store")])]);
          }
        });
        api.createWidget("arduino-grid-button", {
          tagName: "div.arduino-grid-button",
          buildKey: function buildKey() {
            return "arduino-grid-button";
          },
          template: function template(attrs, state) {
            var __h1 = __widget_helpers.iconNode;
            var _r = [];

            _r.push("\n        ");

            var _a0 = [];

            _a0.push(__h1("app-list"));

            _r.push(virtualDom.h('a', _a0));

            _r.push("\n        ");

            var _a1 = [];

            _a1.push("\n        ");

            var _a2 = [];

            _a2.push("\n          ");

            var _a3 = [];
            var _a4 = [];
            var _a5 = [];

            _a5.push("\n            ");

            var _a6 = [];

            _a6.push("\n            ");

            _a5.push(virtualDom.h('div', {
              "className": "app-application__icon",
              "attributes": {}
            }, _a6));

            _a5.push("\n            ");

            var _a7 = [];

            _a7.push("IoT Cloud");

            _a5.push(virtualDom.h('div', {
              "className": "app-application__name",
              "attributes": {}
            }, _a7));

            _a5.push("\n          ");

            _a4.push(virtualDom.h('a', {
              "className": "app-application",
              "attributes": {
                "id": "iot-cloud",
                "href": "https://create.arduino.cc/iot",
                "target": "blank",
                "rel": "noopener noreferrer"
              }
            }, _a5));

            _a3.push(virtualDom.h('div', {
              "className": "app-applications__item",
              "attributes": {}
            }, _a4));

            var _a8 = [];
            var _a9 = [];

            _a9.push("\n            ");

            var _a10 = [];

            _a10.push("\n\n            ");

            _a9.push(virtualDom.h('div', {
              "className": "app-application__icon",
              "attributes": {}
            }, _a10));

            _a9.push("\n            ");

            var _a11 = [];

            _a11.push("Web Editor");

            _a9.push(virtualDom.h('div', {
              "className": "app-application__name",
              "attributes": {}
            }, _a11));

            _a9.push("\n          ");

            _a8.push(virtualDom.h('a', {
              "className": "app-application",
              "attributes": {
                "id": "web-editor",
                "href": "https://create.arduino.cc/editor",
                "target": "blank",
                "rel": "noopener noreferrer"
              }
            }, _a9));

            _a3.push(virtualDom.h('div', {
              "className": "app-applications__item",
              "attributes": {}
            }, _a8));

            var _a12 = [];
            var _a13 = [];

            _a13.push("\n            ");

            var _a14 = [];

            _a14.push("\n\n            ");

            _a13.push(virtualDom.h('div', {
              "className": "app-application__icon",
              "attributes": {}
            }, _a14));

            _a13.push("\n            ");

            var _a15 = [];

            _a15.push("Manager for Linux");

            _a13.push(virtualDom.h('div', {
              "className": "app-application__name",
              "attributes": {}
            }, _a15));

            _a13.push("\n          ");

            _a12.push(virtualDom.h('a', {
              "className": "app-application",
              "attributes": {
                "id": "device-manager",
                "href": "https://create.arduino.cc/devices",
                "target": "blank",
                "rel": "noopener noreferrer"
              }
            }, _a13));

            _a3.push(virtualDom.h('div', {
              "className": "app-applications__item",
              "attributes": {}
            }, _a12));

            _a2.push(virtualDom.h('div', {
              "attributes": {
                "id": "app-apps-container-box"
              }
            }, _a3));

            _a2.push("\n        ");

            _a1.push(virtualDom.h('div', {
              "className": "popup-container__box",
              "attributes": {}
            }, _a2));

            _a1.push("\n      ");

            _r.push(virtualDom.h('div', {
              "className": "popup-container",
              "attributes": {}
            }, _a1));

            _r.push("\n      ");

            return _r;
          },
          defaultState: function defaultState() {
            return {
              expanded: false
            };
          },
          click: function click() {
            this.state.expanded = !this.state.expanded;
            document.querySelector(".arduino-grid-button").classList.toggle("active");
          },
          clickOutside: function clickOutside() {
            this.state.expanded = false;
            document.querySelector(".arduino-grid-button").classList.remove("active");
          }
        });
        api.createWidget("arduino-login-button", {
          tagName: "div.arduino-login-button",
          buildKey: function buildKey() {
            return "arduino-login-button";
          },
          html: function html(attrs, state) {
            var currentUser = api.getCurrentUser();

            if (currentUser) {
              return;
            }

            var buttons = [];
            buttons.push(this.attach("button", {
              label: "log_in",
              className: "btn-primary btn-small login-button",
              action: "showLogin",
              icon: "user"
            }));
            return buttons;
          }
        });
        api.createWidget("arduino-search-wrapper", {
          tagName: "div.arduino-search-wrapper",
          buildKey: function buildKey() {
            return "arduino-search-wrapper";
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/arduino-icon-replace", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "arduino-icon-replace",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8", function (api) {
        api.replaceIcon("bars", "arduino-bars");
        api.replaceIcon("search", "arduino-search");
        api.replaceIcon("fab-github", "arduino-github");
      });
    }
  };
  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/arduino-quick-access-items", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "arduino-quick-access-items",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8.13", function (api) {
        api.reopenWidget("quick-access-profile", {
          _getDefaultItems: function _getDefaultItems() {
            var defaultItems = [{
              icon: "user",
              href: "https://id.arduino.cc/",
              content: "Arduino profile",
              className: "arduino-profile"
            }, {
              icon: "user",
              href: "".concat(this.attrs.path, "/summary"),
              content: "Forum profile",
              className: "summary"
            }, {
              icon: "stream",
              href: "".concat(this.attrs.path, "/activity"),
              content: I18n.t("user.activity_stream"),
              className: "activity"
            }];

            if (this.currentUser.can_invite_to_forum) {
              defaultItems.push({
                icon: "user-plus",
                href: "".concat(this.attrs.path, "/invited"),
                content: I18n.t("user.invited.title"),
                className: "invites"
              });
            }

            defaultItems.push({
              icon: "pencil-alt",
              href: "".concat(this.attrs.path, "/activity/drafts"),
              content: I18n.t("user_action_groups.15"),
              className: "drafts"
            }, {
              icon: "cog",
              href: "".concat(this.attrs.path, "/preferences"),
              content: I18n.t("user.preferences"),
              className: "preferences"
            });
            defaultItems.push({
              widget: "do-not-disturb"
            });
            return defaultItems;
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/cookie-consent", ["exports", "discourse/lib/load-script"], function (_exports, _loadScript) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  function initCookieConsent(coppa) {
    var lang = "en";

    if (navigator.language === "it-IT") {
      lang = "it";
    }

    var tracking = coppa ? "" : ", and to show you personalised advertisement";
    var content = "<div id=\"iubenda-cs-title\">We use cookies &#127850;</div><div>Our websites use cookies (also from third parties) for functional and analytical purposes".concat(tracking, ". You can adjust this in <a class=\"iubenda-cs-customize-btn\">Cookie Settings</a> or learn more by reading our %{cookie_policy_link}.</div>");

    if (lang === "it") {
      tracking = coppa ? "" : ", e per mostrare contenuti pubblicitari personalizzati";
      content = "<div id=\"iubenda-cs-title\">Usiamo i cookies &#127850;</div><div>I nostri siti usano cookie (anche di terze parti) per fini funzionali e di analisi".concat(tracking, ". Puoi regolare queste impostazioni nelle <a class=\"iubenda-cs-customize-btn\">Impostazioni di tracciamento</a> o saperne di pi&ugrave; leggendo la %{cookie_policy_link}.</div>");
    }

    window._iub = window._iub || [];
    window._iub.csConfiguration = {
      askConsentAtCookiePolicyUpdate: true,
      ccpaAcknowledgeOnDisplay: false,
      ccpaApplies: false,
      ccpaNoticeDisplay: false,
      consentOnContinuedBrowsing: false,
      cookiePolicyId: 11225532,
      countryDetection: true,
      enableCcpa: false,
      floatingPreferencesButtonDisplay: false,
      startOnDomReady: true,
      lang: lang,
      // localConsentDomain: 'arduino.cc',
      perPurposeConsent: true,
      purposes: coppa ? "1, 4" : "1, 4, 5",
      siteId: 2023027,
      whitelabel: true,
      cookiePolicyUrl: "https://www.arduino.cc/" + lang + "/cookie-policy",
      banner: {
        applyStyles: false,
        content: content,
        rejectButtonDisplay: true,
        rejectButtonCaption: lang === "en" ? "ONLY REQUIRED" : "SOLO NECESSARI",
        position: "float-bottom-left",
        acceptButtonDisplay: true,
        acceptButtonCaption: lang === "en" ? "ACCEPT ALL" : "ACCETTA TUTTI",
        backgroundOverlay: false,
        brandBackgroundColor: "black"
      },
      callback: {
        // push events to google tag manager to enable the firing of specific tags according to the preference given by the user
        onPreferenceFirstExpressed: function onPreferenceFirstExpressed(preference) {
          var dataLayer = window.dataLayer || [];
          dataLayer.push({
            // eslint-disable-next-line camelcase
            iubenda_ccpa_opted_out: window._iub.cs.api.isCcpaOptedOut()
          });

          if (preference) {
            if (preference.consent) {
              dataLayer.push({
                event: "iubenda_consent_given"
              });
            } else if (!preference.consent) {
              dataLayer.push({
                event: "iubenda_consent_rejected"
              });
            } else if (preference.purposes) {
              for (var purposeId in preference.purposes) {
                if (preference.purposes[purposeId]) {
                  dataLayer.push({
                    event: "iubenda_consent_given_purpose_" + purposeId
                  });
                }
              }
            }
          } else {
            dataLayer.push({
              event: "iubenda_preference_not_needed"
            });
          }
        }
      }
    };
    return (0, _loadScript.default)("//cdn.arduino.cc/header-footer/iubenda-7477c61df49044b49eabbd94edfbd933.js");
  }

  var _default = {
    name: "init-cookie-consent",
    initialize: function initialize() {
      initCookieConsent();
    }
  };
  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/d-navigation-class", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "d-navigation-class",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8", function (api) {
        api.modifyClass("component:d-navigation", {
          pluginId: "d-navigation-class",
          didInsertElement: function didInsertElement() {
            document.body.classList.add("filter-mode-".concat(this.filterType));
          },
          willDestroyElement: function willDestroyElement() {
            document.body.classList.remove("filter-mode-".concat(this.filterType));
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/search-bar", ["exports", "@ember/runloop", "discourse-common/utils/decorators", "discourse/lib/plugin-api"], function (_exports, _runloop, _decorators, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "search-bar",
    initialize: function initialize(container) {
      (0, _pluginApi.withPluginApi)("0.8.13", function (api) {
        var _dec, _dec2, _obj;

        api.modifyClass("component:site-header", (_dec = (0, _decorators.on)("didInsertElement"), _dec2 = (0, _decorators.on)("willDestroyElement"), (_obj = {
          pluginId: "search-bar",
          boundToggleVisibility: null,
          toggleVisibility: function toggleVisibility(topicToggled) {
            var appController = container.lookup("controller:application");
            var oldShowHeaderSearch = appController.showHeaderSearch;
            appController.set("showHeaderSearch", !this.hideHeaderSearch);

            if (topicToggled || oldShowHeaderSearch === undefined || appController.showHeaderSearch !== oldShowHeaderSearch) {
              this.queueRerender();
              (0, _runloop.scheduleOnce)("afterRender", function () {
                $(".d-header").toggleClass("header-search-enabled", !$(".panel > .search-menu").length && appController.showHeaderSearch);
              });
            }
          },
          initSizeWatcher: function initSizeWatcher() {
            var _this = this;

            this.set("boundToggleVisibility", (0, _runloop.bind)(this, this.toggleVisibility));
            window.addEventListener("resize", this.boundToggleVisibility);
            (0, _runloop.scheduleOnce)("afterRender", function () {
              _this.toggleVisibility();
            });
          },
          destroySizeWatcher: function destroySizeWatcher() {
            window.removeEventListener("resize", this.boundToggleVisibility);
          }
        }, (_applyDecoratedDescriptor(_obj, "initSizeWatcher", [_dec], Object.getOwnPropertyDescriptor(_obj, "initSizeWatcher"), _obj), _applyDecoratedDescriptor(_obj, "destroySizeWatcher", [_dec2], Object.getOwnPropertyDescriptor(_obj, "destroySizeWatcher"), _obj)), _obj)));
        var searchMenuWidget = container.factoryFor("widget:search-menu");
        var corePanelContents = searchMenuWidget.class.prototype["panelContents"];
        api.reopenWidget("search-menu", {
          buildKey: function buildKey(attrs) {
            return "search-".concat(attrs.formFactor || "menu");
          },
          defaultState: function defaultState(attrs) {
            return {
              formFactor: attrs.formFactor || "menu",
              showHeaderResults: false
            };
          },
          buildClasses: function buildClasses() {
            var formFactor = this.state.formFactor;
            var classes = ["search-".concat(formFactor)];

            if (formFactor === "header" && this.state.showHeaderResults) {
              classes.push("show-header-results");
            }

            return classes;
          },
          html: function html() {
            return this.panelContents();
          },
          clearTopicContext: function clearTopicContext() {
            this.state.inTopicContext = false;
            this.state.showHeaderResults = false;
            $("#search-term").val("");
          },
          mouseDownOutside: function mouseDownOutside() {
            if (this.state.formFactor === "menu") {
              return this.sendWidgetAction("toggleSearchMenu");
            } else {
              this.state.showHeaderResults = false;
              this.scheduleRerender();
            }
          },
          click: function click() {
            if (this.state.formFactor === "header") {
              this.showResults();
            }
          },
          searchTermChanged: function searchTermChanged(newTerm) {
            this._super.apply(this, arguments); // simulate a click in search-term input just in case it happened through
            // another mean, like a right click -> paste
            // using click instead of show results to ensure formFactor is header


            this.click();
          },
          showResults: function showResults() {
            this.state.showHeaderResults = true;
            this.scheduleRerender();
          },
          linkClickedEvent: function linkClickedEvent() {
            if (this.state.formFactor === "header") {
              $("#search-term").val("");
              $(".search-placeholder").css("visibility", "visible");
              this.state.showHeaderResults = false;
              this.scheduleRerender();
            }
          },
          panelContents: function panelContents() {
            var _contents;

            var _contents2 = [];

            if (this.state.formFactor === "header") {
              _contents2.push(this.attach("button", {
                icon: "search",
                className: "search-icon",
                action: "showResults"
              }));
            }

            _contents2 = (_contents = _contents2).concat.apply(_contents, _toConsumableArray(corePanelContents.call(this)));

            var results = _contents2.find(function (w) {
              return w.name === "search-menu-results";
            });

            if (results && results.attrs.results) {
              $(".search-menu.search-header").addClass("has-results");
            } else {
              $(".search-menu.search-header").removeClass("has-results");
            }

            var inputContents = _contents2.filter(function (widget) {
              return widget.name !== "search-menu-results" && widget.name !== "search-context";
            });

            if (this.state.formFactor === "menu" || this.state.showHeaderResults === undefined || this.state.showHeaderResults === null || this.state.showHeaderResults) {
              return [inputContents, this.attach("menu-panel", {
                maxWidth: 500,
                contents: function contents() {
                  return _contents2.filter(function (widget) {
                    return widget.name === "search-menu-results" || widget.name === "search-context";
                  });
                }
              })];
            } else {
              return inputContents;
            }
          }
        });
        api.decorateWidget("arduino-search-wrapper:before", function (helper) {
          var header = helper.widget.parentWidget;
          var appController = helper.register.lookup("controller:application");

          if (!header.state.searchVisible && appController.showHeaderSearch) {
            var _document$querySelect, _document$querySelect2;

            (_document$querySelect = document.querySelector(".d-header")) === null || _document$querySelect === void 0 ? void 0 : (_document$querySelect2 = _document$querySelect.classList) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.add("header-search-enabled");
            return helper.attach("search-menu", {
              contextEnabled: header.state.contextEnabled,
              formFactor: "header"
            });
          } else {
            var _document$querySelect3, _document$querySelect4;

            (_document$querySelect3 = document.querySelector(".d-header")) === null || _document$querySelect3 === void 0 ? void 0 : (_document$querySelect4 = _document$querySelect3.classList) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.remove("header-search-enabled");
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}

if ('define' in window) {
define("discourse/theme-2/initializers/site-logo-link", ["exports", "discourse/lib/intercept-click", "discourse/lib/plugin-api", "discourse/lib/url"], function (_exports, _interceptClick, _pluginApi, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(2);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.2.".concat(key);
  };

  var _default = {
    name: "site-logo-link",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8.13", function (api) {
        api.reopenWidget("home-logo", {
          click: function click(e) {
            if ((0, _interceptClick.wantsNewWindow)(e)) return false;
            e.preventDefault();

            if (e.target.id === "site-logo" || e.target.id === "site-text-logo") {
              _url.default.routeTo(this.href());
            }

            return false;
          }
        });
      });
    }
  };
  _exports.default = _default;
});
}

(function() {
  if ('Ember' in window) {
    Ember.TEMPLATES["javascripts/components/arduino-footer"] = Ember.HTMLBars.template({"id":null,"block":"{\"symbols\":[],\"statements\":[[7,\"footer\",true],[10,\"class\",\"arduino-footer\"],[8],[0,\"\\n  \"],[7,\"section\",true],[10,\"class\",\"arduino-footer-top\"],[8],[0,\"\\n    \"],[7,\"svg\",true],[10,\"width\",\"102\"],[10,\"height\",\"14\"],[10,\"fill\",\"none\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[10,\"data-inject-url\",\"https://cdn.arduino.cc/header-footer/prod/assets/footerLogo-arduino.svg\"],[8],[0,\"\\n      \"],[7,\"path\",true],[10,\"d\",\"M0 13.812L4.162.19h3.784l4.351 13.622H8.703l-.757-2.649H4.162l-.757 2.649H0zM6.054 3.595L4.73 8.515h2.648l-1.324-4.92zM14.378.19h5.486c3.784 0 5.108 1.891 5.108 4.54 0 1.892-.756 3.216-2.27 3.973l2.649 4.919h-3.973l-1.892-4.163h-1.703v4.352h-3.405V.189zm7.19 4.54c0-1.135-.38-1.892-2.082-1.892h-1.703v3.784h1.703c1.324.189 2.081-.379 2.081-1.892zM27.811.19h4.352c5.108 0 6.81 2.459 6.81 6.62 0 3.217-.945 6.812-6.81 6.812h-4.54V.189h.188zm3.406 2.648v7.946h1.324c2.838 0 3.027-1.703 3.027-3.973 0-2.649-.19-3.973-3.216-3.973h-1.135zM48.81.19h3.217V9.08C52.027 13.054 49 14 46.541 14c-2.27 0-5.298-.757-5.298-4.919V.19h3.406v8.324c0 2.27.756 2.838 2.08 2.838 1.514 0 2.082-.756 2.082-2.838V.19zM55.054 10.973h3.594V3.027h-3.405V.189h10.405v2.838h-3.594v7.946h3.594v2.838H55.243v-2.838h-.19zM71.325 13.622h-3.217V.189h3.784l4.352 8.135V.19h3.216v13.622h-3.406l-4.54-8.703-.19 8.514zM93.082 7c0 3.973-1.514 7-5.865 7-3.973 0-5.676-2.27-5.676-6.81 0-4.163 1.514-7.19 5.676-7.19 3.973 0 5.865 1.703 5.865 7zm-3.595 0c0-3.405-.19-4.162-2.27-4.162-1.703-.19-2.081.946-2.081 4.351 0 2.649.189 4.162 2.08 4.162 2.082-.189 2.271-1.324 2.271-4.351zM95.352 3.027C95.352 1.324 96.676 0 98.189 0c1.703 0 3.027 1.324 3.027 3.027s-1.324 3.027-3.027 3.027c-1.513-.19-2.837-1.513-2.837-3.027zm5.297 0c0-1.324-.946-2.46-2.46-2.46-1.324 0-2.27.947-2.27 2.46 0 1.514 1.135 2.46 2.27 2.46 1.514 0 2.46-.946 2.46-2.46zm-3.973-1.892h1.703c1.135 0 1.513.568 1.513 1.135 0 .379-.19.757-.567 1.135l.567 1.325h-1.135l-.378-1.135H98V4.73h-1.135V1.135h-.19zm1.513 1.703c.379 0 .568-.19.568-.568 0-.378-.19-.378-.568-.378h-.378v.946h.378z\"],[10,\"fill\",\"currentColor\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[28,\"d-button\",null,[[\"action\",\"translatedLabel\",\"icon\"],[\"jumpTop\",\"Back to top\",\"arduino-chevron-up\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[7,\"section\",true],[10,\"class\",\"arduino-footer-bottom\"],[8],[0,\"\\n    \"],[7,\"ul\",true],[10,\"class\",\"arduino-footer-menu\"],[8],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://support.arduino.cc/\"],[8],[0,\"Help Center\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/contact-us\"],[8],[0,\"Contact Us\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/Trademark/HomePage\"],[8],[0,\"Trademark & Copyright\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/trademark\"],[8],[0,\"Brand Guidelines\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://store.arduino.cc/distributors\"],[8],[0,\"Distributors\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[10,\"class\",\"hide-mobile\"],[8],[7,\"a\",true],[10,\"href\",\"https://careers.arduino.cc/\"],[8],[0,\"Careers\"],[9],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"arduino-footer-social-menu\"],[8],[0,\"\\n      \"],[7,\"h4\",true],[8],[0,\"Follow us\"],[9],[0,\"\\n      \"],[7,\"ul\",true],[8],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://www.facebook.com/official.arduino\",\"fab-facebook-f\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://www.instagram.com/arduino.cc/\",\"fab-instagram\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://twitter.com/arduino\",\"fab-twitter\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://github.com/arduino/\",\"fab-github\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://www.linkedin.com/company/arduino\",\"fab-linkedin-in\"]]],false],[9],[0,\"\\n        \"],[7,\"li\",true],[8],[1,[28,\"d-button\",null,[[\"href\",\"icon\"],[\"https://www.youtube.com/user/arduinoteam\",\"fab-youtube\"]]],false],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"arduino-footer-copy\"],[8],[0,\"\\n      © 2020 Arduino\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"ul\",true],[10,\"class\",\"arduino-footer-legal\"],[8],[0,\"\\n      \"],[7,\"li\",true],[10,\"class\",\"hide-desktop\"],[8],[7,\"a\",true],[10,\"href\",\"https://careers.arduino.cc/\"],[8],[0,\"Careers\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/Main/TermsOfService\"],[8],[0,\"Terms of Service\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/Main/PrivacyPolicy\"],[8],[0,\"Privacy Policy\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"href\",\"https://www.arduino.cc/en/Main/Security\"],[8],[0,\"Security\"],[9],[9],[0,\"\\n      \"],[7,\"li\",true],[8],[7,\"a\",true],[10,\"class\",\"iubenda-cs-preferences-link\"],[8],[0,\"Cookie Settings\"],[9],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}","meta":{}});
  }
})();

