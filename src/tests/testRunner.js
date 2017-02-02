/**
 * Request Spec Functional Tests
 */
require('leaked-handles').set({
  fullStack: true, // use full stack traces
  timeout: 5000, // run every 30 seconds instead of 5.
  debugSockets: true // pretty print tcp thrown exceptions.
})

process.env.NODE_ENV = 'test'
const glob = require('glob')
const pattern = 'src/tests/**/*.spec.js'
const {resolve} = require('path')
const mongoose = require('mongoose')

const cwd = process.cwd()
// server.on('close', () => {
//   mongoose.disconnect()
// })

glob(pattern, (err, files) => {
  if (err) {
    // return process.exit(1)
    return
  }
  files.forEach(f => {
    // setTimeout(() => {
    require(resolve(cwd, f))
  // }, 3000)
  })
})
