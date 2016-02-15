
const path = require('path');
const all = {
  env: process.env.NODE_ENV,
  root: path.normalize(path.resolve(__dirname, '/../../..')),
  port: process.env.PORT || 5000,
  version: 'v0',
  secrets: {
    session: 'demo-secret'
  },
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

module.exports = all;
