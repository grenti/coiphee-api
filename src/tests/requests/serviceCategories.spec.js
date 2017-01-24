process.env.NODE_ENV = 'test'
const factory = require('../factories/serviceCategory')
const ServiceCategory = require('../../app/models/serviceCategory')
const test = require('../tape-async')
const mongoose = require('mongoose')
const {request, server} = require('./request')

const before = test
const after = test

function buildServiceCategories() {
  let serviceCategories = []
  for (let i = 0; i < 30; i++) {
    serviceCategories.push(factory.build())
  }
  return serviceCategories
}

function setup() {
  const serviceCategory = buildServiceCategories()
  return ServiceCategory.insertMany(serviceCategory)
}

function teardown() {
  return ServiceCategory.remove({}).exec()
}

(async function() {
  const a = await before('Setup ServiceCategory Data')
  await setup()
  a.end()
})();

(async function () {
  const g = await test('GET /ServiceCategories list should return 200')
  request
    .get('/servicecategories')
    .expect(200)
    .end((err, res) => {
      g.error(err)
      g.notEqual(res.body, null)
      g.notEqual(res.body, [])
      g.ok(res.body.length === 30)
    })
})();

(async function () {
  const e = await after('Teardown ServiceCategory data')
  await teardown()
  await mongoose.disconnect()
  await server.close()
  e.end()
})()
