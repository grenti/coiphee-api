process.env.NODE_ENV = 'test'
const factory = require('../factories/shoppe')
const Shoppe = require('../../app/models/shoppe')
const test = require('tape')
const mongooseSetup = require('../../config/mongoose')
const {request, server} = require('./request')
const route = require('../../app/routes/routeBuilder')('shoppes')

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
  console.log('setup beginning')
  return Shoppe.insertMany(shoppes)
}

function teardown () {
  console.log('Deleting Shoppes Db Data')
  return Shoppe.remove({}).exec()
}

before('Setup Shoppe Data', t => {
  setup()
    .then(docs => {
      t.plan(2)
      t.notEqual(docs, null)
      t.ok(docs.length === 30)
    }).catch(e => {
      console.error(e)
    })
})

test('GET /Shoppes list should return 200', t => {
  console.log('/GET Shoppe reached')
  request
    .get(route)
    .expect(200)
    .end((err, res) => {
      t.error(err)
      t.notEqual(res.body, null)
      t.notEqual(res.body, [])
      t.end()
    })
})

test('POST /Shoppes should return 201', t => {
  const data = factory.build()
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      t.error(err)
      t.notEqual(res.body, null, 'response body should not be null')

      const shoppe = res.body
      t.equal(shoppe.name, data.name, 'Name should be the same')

      const { phone } = shoppe
      t.ok(phone)
      t.equal(phone.length, data.phone.length, 'Shoppe phone array length should be the same')
      phone.forEach(l => t.ok(data.phone.find(p => p.number)))

      t.deepEqual(shoppe.location, data.location, 'Location should be the same')

      const { paymentTypes } = shoppe
      t.equal(paymentTypes.length, data.paymentTypes.length)
      paymentTypes.forEach(l => t.ok(data.paymentTypes.includes(l)))

      t.equal(shoppe.walkinAccepted, data.walkinAccepted)

      // t.deepEqual(coiffeur.amenities, data.amenities)

      const { amenities } = shoppe
      t.equal(amenities.length, data.amenities.length)
      // console.log(amenities, data.amenities)
      // amenities.forEach(a => t.ok(data.amenities.filter(f => f.name === a.name).length === 0))

      t.end()
    })
})

test('/GET/:id Shoppes should return 200', t => {
  const data = factory.build()
  let savedShoppe
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      t.error(err, 'request callback error is null')
      savedShoppe = res.body
      t.notEqual(savedShoppe, null, "response body shouldn't be null")
      // t.deepEqual(savedCoiffeur, data, 'response body should be the same')

      request
        .get(`${route}/${savedShoppe._id}`)
        .expect(200)
        .end((err, res) => {
          t.error(err, 'request callback error is null')
          t.notEqual(res.body, null, "response body shouldn't be null")

          t.deepEqual(savedShoppe.name, data.name, 'Name should be the same')

          const { phone } = savedShoppe
          t.ok(phone)
          t.equal(phone.length, data.phone.length, 'savedShoppe phone array length should be the same')
          phone.forEach(l => t.ok(data.phone.find(p => p.number)))

          t.deepEqual(savedShoppe.location, data.location, 'Location should be the same')

          const { paymentTypes } = savedShoppe
          t.equal(paymentTypes.length, data.paymentTypes.length)
          paymentTypes.forEach(p => t.ok(data.paymentTypes.includes(p)))

          const { amenities } = savedShoppe
          t.equal(amenities.length, data.amenities.length)
          t.end()
        })
    })
})

test('/PUT:id Shoppes update should return 200', t => {
  const data = factory.build()
  let savedShoppe
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      t.error(err, 'request callback error is null')
      savedShoppe = res.body
      t.notEqual(savedShoppe, null, "response body shouldn't be null")
      // t.deepEqual(savedCoiffeur, data, 'response body should be the same')

      savedShoppe.name = data.name = 'Turnt Meister'
      savedShoppe.location.street = data.location.street = '123 Foncha Street'
      const id = savedShoppe._id
      delete savedShoppe._id

      request
        .put(`${route}/${id}`)
        .send(savedShoppe)
        .expect(200)
        .end((err, resp) => {
          t.error(err, 'request callback error is null')
          t.notEqual(resp.body, null, "response body shouldn't be null")

          request
            .get(`${route}/${id}`)
            .expect(200)
            .end((err, respo) => {
              t.error(err, 'Updated shoppe should have been retrieved')
              t.notEqual(respo.body, null, 'Shoppe get should not be null')

              t.equal(respo.body.name, data.name, 'Shoppe updated name should be the same')
              t.equal(respo.body.location.street, data.location.street, 'Shoppe updated location street should be the same')
              t.end()
            })
        })
    })
})

test('/DELETE/:id Shoppes delete record and return 200', t => {
  const data = factory.build()
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      t.error(err, 'request callback error is null')
      t.notEqual(res.body, null, "response body shouldn't be null")

      request
        .delete(`${route}/${res.body._id}`)
        .expect(200)
        .end((err, resp) => {
          t.error(err, 'request callback error is null')
          t.deepEqual(resp.body, {}, 'response body should be empty')

          request
            .get(`${route}/${res.body._id}`)
            .expect(404)
            .end((err, respo) => {
              t.error(err)
              t.deepEqual(respo.body, {})
              t.end()
            })
        })
    })
})

// This is the last test in the test suite, so it's the only one that
// will definitely disconnect mongoose from MongoDb. The others will
// check if they are run manually from the terminal and will only
// disconnect mongoose if they aren't run in the glob suite (testrunner file)
after('Teardown Shoppe Data', t => {
  teardown()
    // .then(() => {
    //   if (require.main === module) {
    //     console.log('Direct module call')
    //     return mongooseSetup.disconnect()
    //   } else {
    //     console.log('Glob require call')
    //     const mongoose = mongooseSetup.getMongoose()
    //     console.log(mongoose.connection.readyState)
    //     if (mongoose.connection.readyState === 1) {
    //       console.log('Still connected to MongoDb')
    //       return mongooseSetup.disconnect()
    //     } else {
    //       return new Promise(() => {
    //       }, () => {
    //       })
    //     }
    //   }
    // })
    .then(() => mongooseSetup.disconnect())
    .then(() => {
      server.close()
      t.end()
    })
})

// test.onFinish(() => console.log('Tape on Finish called'))
