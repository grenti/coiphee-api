
process.env.NODE_ENV = 'test'
const factory = require('../factories/shoppe')
const Shoppe = require('../../app/models/shoppe')
const test = require('../tape-async')
const mongoose = require('mongoose')
const {request} = require('./request')

const before = test
const after = test;

(async function () {
  const b = await before('Setup Mongoose MongoDB')
  b.end()
})();

(async function () {
  try {
    console.log('called async method')
    const assert = await test('Shoppes list should return successfully')
    request
      .get('/shoppes')
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
  a.end()
  mongoose.disconnect()
  // server.close()
})()
