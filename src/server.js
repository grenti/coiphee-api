const enableDestroy = require('server-destroy')
const app = require('./appSetup')
const config = require('./config')
// const mongooseSetup = require('./config/mongoose')

// let server
// // if (require.main === module) {
// if (!module.parent) {
//   server = app.listen(config.port, () => {
//     console.log(`Koa application mounted on port ${config.port}`)
//   })
// }

const server = app.listen(config.port, () => {
  console.log(`Koa application mounted on port ${config.port}`)
})

// server.on('close', () => mongooseSetup.disconnect())

enableDestroy(server)

module.exports = server
