/**
 * Request Spec Functional Tests
 */

const glob = require('glob')
const pattern = 'src/tests/**/*.spec.js'
const {resolve} = require('path')

const cwd = process.cwd()
// mongoose.setup()

glob(pattern, (err, files) => {
  if (err) {
    return process.exit(1)
  }
  files.forEach(f => {
    console.log(`Executing require('${f}')`)
    require(resolve(cwd, f))
  })
})
