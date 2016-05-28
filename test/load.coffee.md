    chai = require 'chai'
    chai.should()
    pkg = require '../package'
    debug = (require 'debug') "#{pkg.name}:test:load"

    describe 'The module', ->
      it 'should load', ->
        m = require '..'
        m.should.have.property 'client'

      it 'should extend the context', ->
        Zappa = require 'zappajs'
        context = Zappa.app ->
          @with require '..'

        context.should.have.property 'client'

    describe '@client', ->

        app = server = null
        port = 3211

        before (done ) ->
          @timeout 10*1000

          Zappa = require 'zappajs'

          {app,server} = Zappa port, ->
            @use session:
              store: new @session.MemoryStore()
              secret: 'foo'
              resave: true
              saveUninitialized: true

            @with require '..'
            @client '/app.js', ->
              @emit 'ready'
            @get '/index.html', '<html><head><title>FooBar</title></head><body></body></html>'
            @on 'ready', ->
              @broadcast 'completed'

          server.on 'listening', ->
            setTimeout (-> done()), 8*1000

        after ->
          server.close()

        jsdom = require 'jsdom'

        it 'should execute', (done) ->
          @timeout 15*1000
          jsdom.env
            url: "http://127.0.0.1:#{port}/index.html"
            scripts: ["http://127.0.0.1:#{port}/app.js"]
            done: (err,window) ->
              debug "JSDOM: #{err?.stack ? err}, done"
            virtualConsole: jsdom.createVirtualConsole().sendTo(console)

          io = require 'socket.io-client'
          socket = io "http://127.0.0.1:#{port}"
          socket.on 'completed', ->
            done()


    describe '@browser', ->

      app = server = null
      port = 3212

      before (done) ->
        @timeout 10*1000

        Zappa = require 'zappajs'

        {app,server} = Zappa port, ->
          @with require '..'
          @browser '/app.js', ->
            window.ready = 42

        server.on 'listening', ->
          setTimeout (-> done()), 8*1000

      after ->
        server.close()

      jsdom = require 'jsdom'

      it 'should execute', (done) ->
        @timeout 15*1000
        jsdom.env
          url: "http://127.0.0.1:#{port}/index.html"
          scripts: ["http://127.0.0.1:#{port}/app.js"]
          done: (err,window) ->
            debug "JSDOM: #{err?.stack ? err}, done"
            done() if window.ready is 42
          virtualConsole: jsdom.createVirtualConsole().sendTo(console)
