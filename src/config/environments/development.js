const development = {
  port: process.env.PORT || 4265,
  mongo: {
    url: 'mongodb://localhost:27017/coiphee_dev'
  }
}

module.exports = development
