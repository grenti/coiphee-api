const { NODE_ENV, PORT, DB_USER, DB_PW, DB_URI, DB_PORT, DB_NAME } = process.env
const development = {
  env: NODE_ENV || 'development',
  port: PORT || 4265,
  mongo: {
    url: `mongodb://${DB_USER}:${DB_PW}@${DB_URI}:${DB_PORT}/${DB_NAME}`
  }
}

module.exports = development
