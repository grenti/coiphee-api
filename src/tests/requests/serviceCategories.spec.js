process.env.NODE_ENV = 'test'
const factory = require('../factories/serviceCategory')
const ServiceCategory = require('../../app/models/serviceCategory')
const test = require('tape')
const mongooseSetup = require('../../config/mongoose')
const {request, server} = require('./request')
const route = '/servicecategories'

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

test('/GET /ServiceCategories list should return 200', t => {
  request
    .get(route)
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

test('POST /ServiceCategories should return 201', t => {
  const data = factory.build()
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      t.error(err)
      t.notEqual(res.body, null, 'response body should not be null')

      const serviceCategory = res.body
      t.equal(serviceCategory.name, data.name, 'Name should be the same')
      t.end()
    })
})

test('/GET/:id /ServiceCategories should return 200', t => {
  const data = factory.build()
  let savedServiceCategory
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      t.error(err, 'request callback error is null')
      savedServiceCategory = res.body
      t.notEqual(savedServiceCategory, null, "response body shouldn't be null")
      // t.deepEqual(savedCoiffeur, data, 'response body should be the same')

      request
        .get(`${route}/${savedServiceCategory._id}`)
        .expect(200)
        .end((err, res) => {
          t.error(err, 'request callback error is null')
          t.notEqual(res.body, null, "response body shouldn't be null")

          t.deepEqual(savedServiceCategory.name, data.name, 'Name should be the same')
          t.end()
        })
    })
})

test('/PUT:id /ServiceCategories update should return 200', t => {
  const data = factory.build()
  let savedServiceCategory
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      t.error(err, 'request callback error is null')
      savedServiceCategory = res.body
      t.notEqual(savedServiceCategory, null, "response body shouldn't be null")
      // t.deepEqual(savedCoiffeur, data, 'response body should be the same')

      savedServiceCategory.name = data.name = 'So Lit!'
      const id = savedServiceCategory._id
      delete savedServiceCategory._id

      request
        .put(`${route}/${id}`)
        .send(savedServiceCategory)
        .expect(200)
        .end((er, resp) => {
          t.error(er, 'request callback error is null')
          t.notEqual(resp.body, null, "response body shouldn't be null")

          t.equal(savedServiceCategory.name, data.name, 'Name should be the same')
          request
            .get(`${route}/${id}`)
            .expect(200)
            .end((e, respo) => {
              t.error(e, 'Updated serviceCategory should have been retrieved')
              t.notEqual(respo.body, null, 'ServiceCategory get should not be null')

              t.equal(respo.body.name, data.name, 'ServiceCategory updated name should be the same')
              t.end()
            })
        })
    })
})

test('/DELETE/:id /ServiceCategories delete record and return 200', t => {
  const data = factory.build()
  request
    .post(route)
    .send(data)
    .expect(201)
    .end((err, res) => {
      t.error(err, 'request callback error is null')
      t.notEqual(res.body, null, "response body shouldn't be null")
      const savedServiceCategory = res.body

      request
        .delete(`${route}/${savedServiceCategory._id}`)
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

after('Teardown ServiceCategory data', t => {
  teardown()
    .then(() => {
      if (require.main === module) {
        return mongooseSetup.disconnect()
      }
    })
    .then(() => {
      server.close()
      t.end()
    })
})

// test.onFinish(() => console.log('Tape on Finish called'))
