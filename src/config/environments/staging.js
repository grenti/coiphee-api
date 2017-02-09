const staging = {
  env: process.env.NODE_ENV || 'staging',
  port: process.env.PORT || 8050,
  mongo: {
    url: 'mongodb://developer:pa$$W0rd@ds131729.mlab.com:31729/coiphee_stg'
  }
}

module.exports = staging
