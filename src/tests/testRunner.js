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

const cwd = process.cwd()

glob(pattern, (err, files) => {
  if (err) {
    return console.error(`Test Runner Failed. Error: ${err}`)
  }
  files.forEach(f => {
    console.log(`Executing require('${f}')`)
    require(resolve(cwd, f))
  })
})
