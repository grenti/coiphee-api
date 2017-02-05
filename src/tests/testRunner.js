/**
 * Request Spec Functional Tests
 */

const glob = require('glob')
const pattern = 'src/tests/**/*.spec.js'
const {resolve} = require('path')
const mongoose = require('../config/mongoose')
const {request} = require('./requests/request')

const cwd = process.cwd()
// mongoose.setup()

glob(pattern, (err, files) => {
  if (err) {
    return process.exit(1)
  }
  if (files && files.length) {
    // request
    //   .get('/')
    //   .expect(200)
    //   .end((err, res) => {
    //     // console.log(err)
    //     // console.log(res)
    //   })
  }
  files.forEach(f => {
    console.log(`Executing require('${f}')`)
    require(resolve(cwd, f))
  })
})

// mongoose.getMongoose().disconnect()
