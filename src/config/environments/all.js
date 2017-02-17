const path = require('path')
const all = {
  env: process.env.NODE_ENV,
  root: path.normalize(path.resolve(__dirname, '/../../..')),
  port: process.env.PORT || 4265,
  version: 'v0',
  ssl: false,
  webToken: {
    secret: 'demo-secret',
    duration: 1440
  },
  bunyan: {
    name: 'coiphee-api',
    streams: [
      { level: 'info', stream: process.stdout },
      { level: 'error', path: 'log/error.log' }
    ]
  },
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  uri() {
    return `${this.ssl ? 'https' : 'http'}://localhost:${this.port}`
  }
}

module.exports = all
