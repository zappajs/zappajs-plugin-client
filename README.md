`@client` plugin for [ZappaJS](https://github.com/zappajs/zappajs)
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

Test
====

Note that since this module calls itself (client-side) during the tests, you should `npm link ; npm link zappajs-plugin-client` before attempting `npm test`.
