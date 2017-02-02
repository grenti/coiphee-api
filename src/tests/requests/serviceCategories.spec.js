process.env.NODE_ENV = 'test'
const factory = require('../factories/serviceCategory')
const ServiceCategory = require('../../app/models/serviceCategory')
// const test = require('../tape-async')
const test = require('tape')
const mongoose = require('mongoose')
const {request, server} = require('./request')

const before = test
const after = test

function buildServiceCategories () {
  let serviceCategories = []
  for (let i = 0; i < 30; i++) {
    serviceCategories.push(factory.build())
  }
  return serviceCategories
}

function setup () {
  const serviceCategory = buildServiceCategories()
  return ServiceCategory.insertMany(serviceCategory)
}

function teardown () {
  return ServiceCategory.remove({}).exec()
}

before('Setup ServiceCategory Data', t => {
  setup().then(docs => {
    t.notEqual(docs, null)
    t.ok(docs.length === 30)
    t.end()
  })
})

test('GET /ServiceCategories list should return 200', t => {
  request
    .get('/servicecategories')
    .expect(200)
    .end((err, res) => {
      console.log('ServiceCategory call came back')
      t.error(err)
      t.notEqual(res.body, null)
      t.notEqual(res.body, [])
      t.ok(res.body.length === 30)
      t.end()
    })
})

after('Teardown ServiceCategory data', t => {
  teardown()
    // .then(() => {
    //   return mongoose.disconnect()
    // })
    .then(() => {
      server.close()
      t.end()
    })
})

// (async function() {
//   const a = await before('Setup ServiceCategory Data')
//   await setup()
//   a.end()
// })()

// (async function () {
//   try {
//     const g = await test('GET /ServiceCategories list should return 200')
//     request
//       .get('/servicecategories')
//       .expect(200)
//       .end((err, res) => {
//         console.log('ServiceCategory call came back')
//         g.error(err)
//         g.notEqual(res.body, null)
//         g.notEqual(res.body, [])
//         g.ok(res.body.length === 30)
//         g.end()
//       })
//   } catch (e) {
//     console.error(e)
//   }
// })()

// (async function () {
//   const e = await after('Teardown ServiceCategory data')
//   await teardown()
//   await mongoose.disconnect()
//   await server.close()
//   e.end()
// })()
