
const config = require('../config');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect(config.mongo.url, function(err) {
    if (err) {
      console.log('Mongo connection error', err);
    } else {
      console.log('Mongo connection successful');
    }
  });
};
