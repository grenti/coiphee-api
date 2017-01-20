const supertest = require('supertest')
const {app, server} = require('../../server')

// const request = supertest(app.listen())
const request = supertest(server)

module.exports = {app, server, request}
