
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceCategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 128 }
});

module.exports = mongoose.model('ServiceCategory', serviceCategorySchema);
