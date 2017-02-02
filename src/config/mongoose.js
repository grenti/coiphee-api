'use strict'

// Bring Mongoose into the app
const mongoose = require('mongoose')
const config = require('./index')
const Logger = require('bunyan')
const log = new Logger({ name: 'MongooseConfig' })

module.exports = {
  /**
   * Setup Mongoose connection to MongoDB
   */
  setup() {
    return mongooseSetup()
  },
  /**
   * Get underlying mongoose module
   * @returns Mongoose {Mongoose} module
   */
  getMongoose() {
    return mongoose
  }
}

function mongooseSetup () {
  mongoose.Promise = global.Promise
  const { connection } = mongoose

  if (!(connection.readyState === 1 ||
    connection.readyState === 2)) {
    mongoose.connect(config.mongo.url)
      .then(() => console.log('connection to mongodb successful'),
        err => console.error('connection to mongodb failed', err))
      .catch(err => console.error('connection to mongodb failed', err))
  }

  log.info(config.mongo.url)
  // CONNECTION EVENTS
  // When successfully connected
  connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${config.mongo.url}`)
  })

  // If the connection throws an error
  connection.on('error', err => {
    console.log(`Mongoose default connection error: ${err}`)
  })

  // When the connection is disconnected
  connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected')
  })

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
    })
  })

  process.on('EXIT', () => {
    connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
    })
  })
}
