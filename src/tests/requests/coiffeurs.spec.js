'use strict'

process.env.NODE_ENV = 'test'
const factory = require('../factories/coiffeur')
const Coiffeur = require('../../app/models/coiffeur')
var savedCoiffeurs = []
const asyncTest = require('../tape-async')
// run the server locally for a test instance
const {request, server} = require('./request')
const mongoose = require('mongoose')

// it('should list one coiffeur on /coiffeurs/1 GET', function(done) {
//   // console.log(savedCoiffeurs[3])
//   chai.request(serverUri)
//     .get(routeBuilder('coiffeurs') + `/${savedCoiffeurs[3]._id}`)
//     .end(function(err, res) {
//       should.not.exist(err)
//       res.should.have.status(200)
//       done()
//     })
// })

// it('should create one coiffeur on /coiffeurs POST', function(done) {
//   chai.request(serverUri)
//     .post(routeBuilder('coiffeurs'))
//     .send(factory.build())
//     .end(function(err, res) {
//       should.not.exist(err)
//       res.should.have.status(201)
//       done()
//     })
// })

// after(function(done) {
//   Coiffeur.remove({}, function(err, docs) {
//     if (err) {
//       console.error('Error deleting coiffeur data')
//       return done()
//     }
//     done()
//   })
// })

// t.end()
// })

const before = asyncTest
const after = asyncTest

function buildCoiffeurs() {
  var coiffeurs = []
  for (let i = 0; i < 15; i++) {
    coiffeurs.push(factory.build())
  }
  return coiffeurs
}

function setup() {
  const coiffeurs = buildCoiffeurs()
  return Coiffeur.insertMany(coiffeurs)
}

function teardown() {
  return Coiffeur.remove({}).exec()
}

(async function () {
  const b = await before('Setup Coiffeur Data')
  savedCoiffeurs = await setup()
  // savedCoiffeurs.forEach(c => console.log(c))
  b.end()
})();

(async function () {
  const l = await asyncTest('Coiffeur list should run ok')
  request
    .get('/coiffeurs?page=1&offset=10')
    .expect(200)
    .end((err, res) => {
      l.plan(3)
      l.error(err, 'request callback error is null')
      l.notEqual(res.body, null, "response body shouldn't be null")
      l.notEqual(res.body, [], "response body shouldn't be empty")
      // l.deepLooseEqual(res.body.data, savedCoiffeurs)
    })
})();

(async function () {
  try {
    const assert = await asyncTest('Shoppes list should return successfully')
    request
      .get('/coiffeurs')
      .expect(200)
      .end((err, res) => {
        assert.error(err)
        assert.notEqual(res.body, null)
        assert.end()
      })
  } catch (e) {
    console.error(e)
  }
})();

(async function () {
  const a = await after('Teardown Collection MongoDB')
  await teardown()
  await mongoose.disconnect()
  await server.close()
  console.log('Still listening: ', server.listening)
  a.end()
})()

