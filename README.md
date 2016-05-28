`@client` and `@browser` plugin for [ZappaJS](https://github.com/zappajs/zappajs)
==============================

Usage
=====

    Zappa ->

      @with 'client'

      @client '/app.js': ->
        # your code here

is equivalent to

      @browser '/app.js': ->
        (require 'zappajs-client') ->
          @ready ->
            # your code here

`@browser`
==========

    Zappa ->
      @with 'client'
      @browser '/with-dom.js', ->

        $ = require 'component-dom'
        $('#hello').html 'Hello world!'

Serves the function, [browserified](http://browserify.org/), as `/with-dom.js`, with content-type `application/javascript`.

Notice that since we cannot retrieve the original CoffeeScript code from the Javascript compiled version, there could be conflicts with the helper functions' names. Therefor avoid using the following names as variables: `slice`, `hasProp`, `bind`, `extend`, `ctor`, `indexOf`, and `modulo`.

`@client`
=========

This function is particularly useful to build client-side application that require the [`zappajs-client`](https://github.com/zappajs/zappajs-client) module:

    Zappa ->
      @with 'client'
      @client '/app.js', ->
        Debug = require 'debug'
        Debug.enable '*'

        pkg = require './package.json'
        debug = Debug "#{pkg.name}:app"

        debug 'Starting client'

        @on 'server-said', (data) ->
          @emit 'ok', data+4

Fallback
========

You can still use [`browserify-middleware`](https://www.npmjs.com/package/browserify-middleware) to build bundles from independent source files:

    Browserify = require 'browserify-middleware'
    # You may explicitely set the dependencies via `settings`
    Browserify.settings transform: ['coffeeify']
    # or use [`browserify.transform` in your `package.json`](https://github.com/substack/node-browserify#browserifytransform).

    Zappa ->
      # It would be nice to have this as the default `engine` in ZappaJS.
      @get '/my-app.js', Browserify './client/app.coffee'

Test
====

Note that since this module calls itself (client-side) during the tests, you should `npm link ; npm link zappajs-plugin-client` before attempting `npm test`.
