// Bring Mongoose into the app
const mongoose = require('mongoose')
const config = require('./index')
const Logger = require('bunyan')
const log = new Logger({ name: 'MongooseConfig' })

module.exports = {
  /**
   * Connect Mongoose to MongoDb instance
   */
  connect() {
    return mongooseSetup()
  },
  /**
   * Disconnect mongoose from MongoDb instance
   */
  disconnect() {
    return disconnect()
  },
  /**
   * Get underlying mongoose module
   * @class {Mongoose} Mongoose class
   * @return {Mongoose} Mongoose module
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
      process.exit(0)
    })
  })
}

function disconnect () {
  const { connection } = mongoose

  if (connection.readyState === 1 ||
    connection.readyState === 2) {
    mongoose.disconnect()
      .then(() => console.log('disconnect from mongodb successful'),
        err => console.error('disconnection to mongodb failed', err))
      .catch(err => console.error('disconnection to mongodb failed', err))
  }
}
