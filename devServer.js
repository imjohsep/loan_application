var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config.dev')
var dbConfig = require('./config')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

/* Mongo */
mongoose.connect(dbConfig.database)
mongoose.connection.on('error', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
})

var app = express()
var api = express()

require('./router')(api)

app.use( bodyParser.json() )

/* Register Routes */
app.use('/api', api)


/* Webpack Middleware */
const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

app.use(middleware)
app.use(webpackHotMiddleware(compiler))

app.get('*', function(req, res) {
 res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
 res.end()
})

app.listen(config._hotPort, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', config._hotPort, config._hotPort)
})
