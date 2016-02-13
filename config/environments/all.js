'use strict';

const all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 5000,
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
