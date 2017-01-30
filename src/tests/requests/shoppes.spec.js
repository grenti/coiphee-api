process.env.NODE_ENV = 'test'
const factory = require('../factories/shoppe')
const Shoppe = require('../../app/models/shoppe')
const test = require('../tape-async')
const mongoose = require('mongoose')
const {request, server} = require('./request')

const before = test
const after = test

function buildShoppes () {
  let shoppes = []
  for (let i = 0; i < 30; i++) {
    shoppes.push(factory.build())
  }
  return shoppes
}

function setup () {
  const shoppes = buildShoppes()
  return Shoppe.insertMany(shoppes)
}

function teardown () {
  return Shoppe.remove({}).exec()
}

before('Setup Shoppe Data', t => {
  setup()
    .then(docs => {
      t.notEqual(docs, null)
      t.ok(docs.length === 30)
      t.end()
    })
})

test('GET /Shoppes list should return 200', t => {
  request
    .get('/shoppes')
    .expect(200)
    .end((err, res) => {
      t.error(err)
      t.notEqual(res.body, null)
      t.notEqual(res.body, [])
      t.end()
    })
})

after('Teardown Shoppe Data', t => {
  teardown()
    .then(() => {
      return mongoose.disconnect()
    })
    .then(() => {
      server.close()
      t.end()
    })
})

// (async function () {
//   const b = await before('Setup Shoppe Data')
//   await setup()
//   b.end()
// })()

// (async function () {
//   try {
//     const assert = await test('GET /Shoppes list should return 200')
//     request
//       .get('/shoppes')
//       .expect(200)
//       .end((err, res) => {
//         assert.error(err)
//         assert.notEqual(res.body, null)
//         assert.notEqual(res.body, [])
//         assert.end()
//       })
//   } catch (e) {
//     console.error(e)
//   }
// })()

// (async function () {
//   const a = await after('Teardown Shoppe Data')
//   await teardown()
//   await mongoose.disconnect()
//   await server.close()
//   a.end()
// })()
