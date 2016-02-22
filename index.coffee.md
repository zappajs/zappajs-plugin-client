ZappaJS Plugin: Add `client` to context.

    invariate = require 'invariate'

    module.exports = zappajs_plugin_client = ->
      {context,browserify} = this
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

    module.exports.client = ->
      (require 'zappajs-client').apply this, arguments
