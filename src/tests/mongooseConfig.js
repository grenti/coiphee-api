const config = require('../config')
const mongoose = require('mongoose')

module.exports = function () {
  mongoose.Promise = global.Promise
  const { connection } = mongoose
  if (!(connection.readyState === 1 ||
    connection.readyState === 2)) {
    mongoose.connect(config.mongo.url)
      .then(() => console.log('Mongo connection successful'),
        err => console.error('Mongo connection error', err))
      .catch(err => console.error('Mongo connection error', err))
  }
}
