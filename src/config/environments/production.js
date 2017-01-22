const { NODE_ENV, PORT, DB_USER, DB_PW, DB_URI, DB_PORT, DB_NAME } = process.env
const production = {
  env: NODE_ENV,
  port: PORT || 8080,
  mongo: {
    url: `mongodb://${DB_USER}:${DB_PW}@${DB_URI}:${DB_PORT}/${DB_NAME}`
  }
}

module.exports = production
