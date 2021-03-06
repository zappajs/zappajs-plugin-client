// Generated by CoffeeScript 1.10.0
(function() {
  var zappajs_plugin_client;

  module.exports = zappajs_plugin_client = function() {
    var browserify, browserify_for, context, invariate;
    invariate = require('invariate');
    browserify_for = require('./browserify-for');
    context = this.context;
    browserify = browserify_for(this);
    context.browserify = context.browser = invariate(browserify);
    context.isomorph = invariate(function(k, v) {
      browserify(k, v);
      v.apply(context);
    });
    return context.client = invariate(function(k, v) {
      v = "function() {\nrequire('zappajs-plugin-client').client( function(){\n  this.ready(\n    " + v + "\n  )\n})\n}";
      return browserify(k, v);
    });
  };

  module.exports.client = function() {
    return (require('zappajs-client')).apply(this, arguments);
  };

}).call(this);
