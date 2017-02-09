const supertest = require('supertest')
// const tape = require('tape')
// const mongooseSetup = require('../../config/mongoose')
// const app = require('../../appSetup')
// const {port} = require('../../config')
const server = require('../../server')

// tape.onFinish(() => mongooseSetup.disconnect())
// tape.onFinish(() => console.log('Tape on Finish called'))
// const request = supertest(app.listen())
const request = supertest(server)

module.exports = {server, request}
