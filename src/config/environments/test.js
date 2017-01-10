const test = {
  env: process.env.NODE_ENV || 'test',
  port: process.env.PORT || 4562,
  mongo: {
    url: 'mongodb://localhost:27017/coiphee_test'
  },
  api: {
    url: 'http://localhost'
  }
}

module.exports = test
