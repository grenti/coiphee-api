
process.env.NODE_ENV = 'test'
const factory = require('../factories/coiffeur')
const Coiffeur = require('../../app/models/coiffeur')
const asyncTest = require('../tape-async')
const {request, server} = require('./request')
const mongooseSetup = require('../../config/mongoose')
const route = require('../../app/routes/routeBuilder')('coiffeurs')

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
  await setup()
  b.end()
})();

(async function () {
  const l = await asyncTest('GET Coiffeur list should return 200')
  request
    .get(`${route}?page=1&offset=10`)
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
    const assert = await asyncTest('POST Coiffeur should return 201')
    const data = factory.build()
    request
      .post(route)
      .send(data)
      .expect(201)
      .end((err, res) => {
        assert.error(err)
        assert.notEqual(res.body, null, 'response body should not be null')
        const coiffeur = res.body
        assert.deepEqual(coiffeur.name, data.name, 'Name should be the same')

        const { license } = coiffeur
        assert.ok(license, 'Coiffeur license should not be empty')
        assert.equal(license, data.license, 'Coiffeur licence should be the same')

        assert.deepEqual(coiffeur.location, data.location, 'Location should be the same')

        const { proficiencies } = coiffeur
        assert.equal(proficiencies.length, data.proficiencies.length)
        proficiencies.forEach(l => assert.ok(data.proficiencies.includes(l)))

        // assert.deepEqual(coiffeur.amenities, data.amenities)

        const { amenities } = coiffeur
        assert.equal(amenities.length, data.amenities.length)
        // console.log(amenities, data.amenities)
        // amenities.forEach(a => assert.ok(data.amenities.filter(f => f.name === a.name).length === 0))
        assert.end()
      })
  } catch (e) {
    console.error(e)
  }
})();

(async function () {
  const l = await asyncTest('GET/:id Coiffeur record should return 200')
  const data = factory.build()
  let savedCoiffeur
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      l.error(err, 'request callback error is null')
      savedCoiffeur = res.body
      l.notEqual(savedCoiffeur, null, "response body shouldn't be null")
      // l.deepEqual(savedCoiffeur, data, 'response body should be the same')

      request
        .get(`${route}/${savedCoiffeur._id}`)
        .expect(200)
        .end((err, res) => {
          l.error(err, 'request callback error is null')
          l.notEqual(res.body, null, "response body shouldn't be null")
          l.deepEqual(savedCoiffeur.name, data.name, 'Name should be the same')

          const { license } = savedCoiffeur
          l.ok(license, 'Coiffeur license should not be empty')
          l.equal(license, data.license, 'Coiffeur licence should be the same')

          l.deepEqual(savedCoiffeur.location, data.location, 'Location should be the same')

          const { proficiencies } = savedCoiffeur
          l.equal(proficiencies.length, data.proficiencies.length)
          proficiencies.forEach(p => l.ok(data.proficiencies.includes(p)))

          const { amenities } = savedCoiffeur
          l.equal(amenities.length, data.amenities.length)
          l.end()
        })
    })
})();

(async function () {
  const l = await asyncTest('PUT/:id Coiffeur update record and return 200')
  const data = factory.build()
  let savedCoiffeur
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      l.error(err, 'request callback error is null')
      savedCoiffeur = res.body
      l.notEqual(savedCoiffeur, null, "response body shouldn't be null")
      // l.deepEqual(savedCoiffeur, data, 'response body should be the same')

      savedCoiffeur.name = data.name = {
        first: 'John',
        last: 'Doe'
      }
      savedCoiffeur.location.street = data.location.street = '123 Foncha Street'
      const id = savedCoiffeur._id
      delete savedCoiffeur._id

      request
        .put(`${route}/${id}`)
        .send(savedCoiffeur)
        .expect(200)
        .end((err, res) => {
          l.error(err, 'request callback error is null')
          l.notEqual(res.body, null, "response body shouldn't be null")

          request
            .get(`${route}/${id}`)
            .expect(200)
            .end((er, resp) => {
              const returned = resp.body
              l.deepEqual(returned.name, data.name, 'Retrieved Coiffeur Name should be the same')

              l.deepEqual(savedCoiffeur.location, data.location, 'Retrieved Coiffeur Location should be the same')
              l.end()
            })
        })
    })
})();

(async function () {
  const l = await asyncTest('DELETE/:id Coiffeur delete record and return 200')
  const data = factory.build()
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      l.error(err, 'request callback error is null')
      l.notEqual(res.body, null, "response body shouldn't be null")

      request
        .delete(`${route}/${res.body._id}`)
        .expect(204)
        .end((err, resp) => {
          l.error(err, 'request callback error is null')
          l.deepEqual(resp.body, {}, 'response body should be empty')

          request
            .get(`${route}/${res.body._id}`)
            .expect(404)
            .end((err, respo) => {
              l.error(err)
              l.deepEqual(respo.body, {})
              l.end()
            })
        })
    })
})();

(async function () {
  const a = await after('Teardown Coiffeur Data')
  await teardown()
  if (require.main === module) {
    await mongooseSetup.disconnect()
  }
  await server.close()
  console.log('Still listening: ', server.listening)
  a.end()
})()

