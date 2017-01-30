/**
 * Request Spec Functional Tests
 */
// require('./requests/coiffeurs.spec')
// require('./requests/shoppes.spec')
// require('./requests/serviceCategories.spec')

const glob = require('glob')
const pattern = 'src/tests/**/*.spec.js'
const {resolve} = require('path')

const cwd = process.cwd()

glob(pattern, (err, files) => {
  if (err) {
    return process.exit(1)
  }
  files.forEach(f => {
    require(resolve(cwd, f))
  })
})
