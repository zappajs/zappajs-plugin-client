    coffeescript_helpers = require 'coffeescript-helpers'
    Browserify = require './browserify-string'
    pkg = require './package'
    debug = (require 'debug') "#{pkg.name}:browserify"

    module.exports = ({route,root,minify,context}) ->
      browserify = (k,v) ->

        actual = coffeescript_helpers.p_exec v
        js = Browserify actual,
          basedir: root
          paths: [root]
        .bundle (err,src) ->
          if err
            debug "browserify: #{err.stack ? err}", actual
            return
          js = src.toString()
          js = minify(js) if context.app.settings['minify']
          route verb: 'get', path: k, handler: js, type: 'js'
        return
