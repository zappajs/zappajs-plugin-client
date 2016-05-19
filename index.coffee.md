ZappaJS Plugin: Add `client`, `browser`, `isomorph` to context.

    module.exports = zappajs_plugin_client = ->
      invariate = require 'invariate'
      browserify_for = require './browserify-for'

      {context} = this
      browserify = browserify_for this

.browserify, .browser
=====================

      context.browserify = context.browser = invariate browserify

.isomorph
=========

      context.isomorph = invariate (k,v) ->
        browserify k,v
        v.apply context
        return

.client
=======

      context.client = invariate (k,v) ->
        v = """
            function() {
            require('zappajs-plugin-client').client( function(){
              this.ready(
                #{v}
              )
            })
            }
        """
        browserify k, v

Client-side function used by `client`
=====================================

    module.exports.client = ->
      (require 'zappajs-client').apply this, arguments
