define("discourse/plugins/discourse-bbcode-color/lib/discourse-markdown/bbcode-color",["exports"],(function(o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.setup=function(o){o.allowList(["font[color]"]),o.allowList({custom:function(o,n,t){if("span"===o&&"style"===n)return/^background-color:#?[a-zA-Z0-9]+$/.exec(t)}}),o.registerOptions((function(o){o.features["bbcode-color"]=!0})),o.markdownIt?o.registerPlugin((function(o){var n=o.inline.bbcode.ruler;n.push("bgcolor",{tag:"bgcolor",wrap:function(o,n,t){o.type="span_open",o.tag="span",o.attrs=[["style","background-color:"+t.attrs._default.trim()]],o.content="",o.nesting=1,n.type="span_close",n.tag="span",n.nesting=-1,n.content=""}}),n.push("color",{tag:"color",wrap:function(o,n,t){o.type="font_open",o.tag="font",o.attrs=[["color",t.attrs._default]],o.content="",o.nesting=1,n.type="font_close",n.tag="font",n.nesting=-1,n.content=""}})})):(o.addPreProcessor((function(o){return function(o){o=o||"";for(;o!==(o=o.replace(/\[color=([^\]]+)\]((?:(?!\[color=[^\]]+\]|\[\/color\])[\S\s])*)\[\/color\]/gi,(function(o,n,t){return"<font color='".concat(n,"'>").concat(t,"</font>")}))););return o}(o)})),o.addPreProcessor((function(o){return function(o){o=o||"";for(;o!==(o=o.replace(/\[bgcolor=([^\]]+)\]((?:(?!\[bgcolor=[^\]]+\]|\[\/bgcolor\])[\S\s])*)\[\/bgcolor\]/gi,(function(o,n,t){return"<span style='background-color:".concat(n,"'>").concat(t,"</span>")}))););return o}(o)})))}}));
//# sourceMappingURL=https://dub2.discourse-cdn.com/arduino/assets/plugins/discourse-bbcode-color-7d5b3ea9b0476047d8c7458673d5ef9224a9436c93d6d0ceb53f4005b560d95d.js.map