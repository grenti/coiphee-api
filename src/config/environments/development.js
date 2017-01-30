const development = {
  port: process.env.PORT || 4265,
  // mongo: {
  //   url: 'mongodb://localhost:27017/coiphee_dev'
  // }
  mongo: {
    url: 'mongodb://developer:pa$$W0rd@ds137139.mlab.com:37139/coiphee_dev'
  }
}

module.exports = development
