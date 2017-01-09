const body = require('koa-body')
const Koa = require('koa')
const app = new Koa()
const cors = require('koa-cors')
const path = require('path')
const convert = require('koa-convert')
const favicon = require('koa-favicon')
const config = require('./config')
const fs = require('fs')
const bunyan = require('bunyan')
const morgan = require('morgan')
const mongoose = require('mongoose')
const jwt = require('koa-jwt')
const routeRegistry = require('./registry')

const log = bunyan.createLogger(config.bunyan)
require('./config/mongoose')

app.on('error', (err, context) => {
  log.error(`Server error: ${err}\nContext: ${context}`)
})

// request body parser
app.use(convert(body({ formidable: { uploadDir: path.resolve(__dirname, '/uploads') } })))

// cors config
app.use(convert(cors({ origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] })))

// x-response-time
app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms} ms`)
  ctx.set('Server-Type', "nunya")
})

// setup the morgan logger
let accessLogStream = fs.createWriteStream(
  path.resolve(__dirname + '/access.log'),
  { flags: 'a' }
)
app.use(morgan('combined', { stream: accessLogStream }))

// logger
app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  const ms = new Date() - start
  log.info('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(convert(favicon(path.join(__dirname, '/favicon.ico'))))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
    } else {
      throw err
    }
  }
});

// app.use(convert(jwt({ secret: 'na-so-so-ndolo' })))

app.context.db = mongoose


routeRegistry(app)

// app.io.use(function * (next) {})

// app.io.route('happen', function * (next) {})

app.listen(config.port, () => {
  console.log(`server running on port ${config.port}`)
})

module.exports = app
