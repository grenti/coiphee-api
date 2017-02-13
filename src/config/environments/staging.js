const { NODE_ENV, PORT, DB_USER, DB_PW, DB_URI, DB_PORT, DB_NAME } = process.env
const staging = {
  env: NODE_ENV || 'staging',
  port: PORT || 8050,
  mongo: {
    url: `mongodb://${DB_USER}:${DB_PW}@${DB_URI}:${DB_PORT}/${DB_NAME}`
  }
}

module.exports = staging
