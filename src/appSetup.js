const body = require('koa-body')
const Koa = require('koa')
const app = new Koa()
const cors = require('koa-cors')
const path = require('path')
const convert = require('koa-convert')
const favicon = require('./middleware/favicon')
const config = require('./config')
const ResponseTime = require('./middleware/responseTime')
const errorHandler = require('./middleware/errorHandler')
const bunyan = require('bunyan')
const routeRegistry = require('./middleware/routeRegistry')

const log = bunyan.createLogger(config.bunyan)
const mongooseSetup = require('./config/mongoose')
mongooseSetup.connect()
app.context.db = mongooseSetup.getMongoose()

app.on('error', errorHandler(log))

// request body parser
app.use(convert(body({ formidable: { uploadDir: path.resolve(__dirname, '/uploads') } })))

// cors config
app.use(convert(cors({ origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] })))

// x-response-time
app.use(ResponseTime.setHeader)

// setup the morgan logger
// let accessLogStream = fs.createWriteStream(
//   path.resolve(__dirname + '/access.log'),
//   { flags: 'a' }
// )
// app.use(morgan('combined', { stream: accessLogStream }))

// logger
app.use(ResponseTime.setLogger)

app.use(convert(favicon()))

// app.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (err) {
//     if (401 == err.status) {
//       ctx.status = 401
//       ctx.body = 'Protected resource, use Authorization header to get access\n'
//     } else {
//       throw err
//     }
//   }
// })

// app.use(convert(jwt({ secret: 'na-so-so-ndolo' })))

routeRegistry(app)
// console.log('routes registered')
// app.io.use(function * (next) {})

// app.io.route('happen', function * (next) {})

// if (!module.parent) {
//   server = app.listen(config.port, () => {
//     console.log(`Koa application server running on port ${config.port}`)
//   })
// }

module.exports = app
