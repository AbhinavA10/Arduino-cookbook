Ember.TEMPLATES["javascripts/discourse-akismet/connectors/flag-modal-bottom/akismet-status"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[4,"if",[[24,["post","akismet_state"]]],null,{"statements":[[0,"  "],[7,"div",true],[10,"class","consent_banner alert alert-info"],[8],[0,"\\n    "],[7,"span",true],[8],[1,[28,"i18n",[[28,"concat",["akismet.post_state.",[24,["post","akismet_state"]]],null]],null],false],[9],[0,"\\n  "],[9],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"javascripts/discourse-akismet/connectors/flag-modal-bottom/akismet-status"}}),define("discourse/plugins/discourse-akismet/discourse-akismet/connectors/flag-modal-bottom/akismet-status",["exports"],(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={setupComponent:function(e,a){a.set("post",e.post)}}})),Ember.TEMPLATES["javascripts/discourse-akismet/connectors/topic-above-post-stream/topic-removed-notification"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[4,"if",[[24,["akismetFlaggedTopic"]]],null,{"statements":[[0,"  "],[7,"div",true],[10,"class","alert alert-info category-read-only-banner"],[8],[0,"\\n    "],[1,[28,"i18n",["akismet.topic_deleted"],null],false],[0,"\\n  "],[9],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"javascripts/discourse-akismet/connectors/topic-above-post-stream/topic-removed-notification"}}),define("discourse/plugins/discourse-akismet/discourse-akismet/connectors/topic-above-post-stream/topic-removed-notification",["exports"],(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={setupComponent:function(e,a){var s="/discourse-akismet/topic-deleted/".concat(e.model.id);a.messageBus.subscribe(s,(function(){a.set("akismetFlaggedTopic",!0)}))}}})),define("discourse/plugins/discourse-akismet/discourse/initializers/add-akismet-state",["exports","discourse/lib/plugin-api"],(function(e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={name:"add-akismet-state",initialize:function(){(0,a.withPluginApi)("0.8.31",(function(e){e.includePostAttributes("akismet_state")}))}};e.default=s})),Ember.TEMPLATES["javascripts/components/reviewable-akismet-api-error"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[7,"div",true],[10,"class","reviewable-score-reason"],[8],[0,"\\n  "],[1,[28,"i18n",["admin.akismet_api_error"],null],false],[0,"\\n  "],[1,[24,["external_error","error"]],false],[0,"\\n  ("],[1,[24,["external_error","code"]],false],[0,")\\n  "],[1,[24,["external_error","msg"]],false],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/components/reviewable-akismet-api-error"}}),Ember.TEMPLATES["javascripts/components/reviewable-akismet-post"]=Ember.HTMLBars.template({id:null,block:'{"symbols":["&default"],"statements":[[1,[28,"reviewable-topic-link",null,[["reviewable","tagName"],[[24,["reviewable"]],""]]],false],[0,"\\n\\n"],[7,"div",true],[10,"class","post-contents-wrapper"],[8],[0,"\\n  "],[1,[28,"reviewable-created-by",null,[["user","tagName"],[[24,["reviewable","target_created_by"]],""]]],false],[0,"\\n\\n  "],[7,"div",true],[10,"class","post-contents"],[8],[0,"\\n    "],[1,[28,"reviewable-created-by-name",null,[["user","tagName"],[[24,["reviewable","target_created_by"]],""]]],false],[0,"\\n\\n    "],[7,"div",true],[10,"class","post-body"],[8],[0,"\\n      "],[1,[28,"html-safe",[[24,["reviewable","payload","post_cooked"]]],null],false],[0,"\\n    "],[9],[0,"\\n\\n    "],[14,1],[0,"\\n\\n"],[4,"if",[[24,["reviewable","payload","external_error"]]],null,{"statements":[[0,"      "],[1,[28,"reviewable-akismet-api-error",null,[["external_error"],[[24,["reviewable","payload","external_error"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/components/reviewable-akismet-post"}}),Ember.TEMPLATES["javascripts/components/reviewable-akismet-user"]=Ember.HTMLBars.template({id:null,block:'{"symbols":["&default"],"statements":[[7,"div",true],[10,"class","reviewable-user-info"],[8],[0,"\\n  "],[7,"div",true],[10,"class","reviewable-user-fields"],[8],[0,"\\n    "],[7,"div",true],[10,"class","reviewable-user-details username"],[8],[0,"\\n      "],[7,"div",true],[10,"class","name"],[8],[1,[28,"i18n",["review.user.username"],null],false],[9],[0,"\\n      "],[7,"div",true],[10,"class","value"],[8],[0,"\\n"],[4,"if",[[24,["reviewable","user_deleted"]]],null,{"statements":[[0,"          "],[1,[24,["reviewable","payload","username"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"          "],[7,"a",true],[11,"href",[28,"get-url",[[28,"concat",["/u/",[24,["reviewable","payload","username"]],"/summary"],null]],null]],[8],[0,"\\n            "],[1,[24,["reviewable","payload","username"]],false],[0,"\\n          "],[9],[0,"\\n"]],"parameters":[]}],[0,"      "],[9],[0,"\\n    "],[9],[0,"\\n\\n    "],[1,[28,"reviewable-field",null,[["classes","name","value"],["reviewable-user-details name",[28,"i18n",["review.user.name"],null],[24,["reviewable","payload","name"]]]]],false],[0,"\\n\\n    "],[1,[28,"reviewable-field",null,[["classes","name","value"],["reviewable-user-details email",[28,"i18n",["review.user.email"],null],[24,["reviewable","payload","email"]]]]],false],[0,"\\n\\n    "],[1,[28,"reviewable-field",null,[["classes","name","value"],["reviewable-user-details bio",[28,"i18n",["review.user.bio"],null],[24,["reviewable","payload","bio"]]]]],false],[0,"\\n  "],[9],[0,"\\n\\n  "],[14,1],[0,"\\n\\n"],[4,"if",[[24,["reviewable","payload","external_error"]]],null,{"statements":[[0,"    "],[1,[28,"reviewable-akismet-api-error",null,[["external_error"],[[24,["reviewable","payload","external_error"]]]]],false],[0,"\\n"]],"parameters":[]},null],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/components/reviewable-akismet-user"}});
//# sourceMappingURL=https://dub2.discourse-cdn.com/arduino/assets/plugins/discourse-akismet-d6c1c1c032720106173fcc509755dd02835c66acdbed6c6d6c2543fe865ba4d8.js.map