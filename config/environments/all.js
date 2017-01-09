'use strict'

const path = require('path')
const all = {
  env: process.env.NODE_ENV,
  root: path.normalize(path.resolve(__dirname, '/../../..')),
  port: process.env.PORT || 4265,
  version: 'v0',
  secrets: {
    session: 'demo-secret'
  },
  bunyan: {
    name: 'coiphee-api',
    streams: [
      { level: 'info', stream: process.stdout },
      { level: 'error', path: 'error.log' }
  ]},
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
}

module.exports = all
