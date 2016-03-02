
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String, required: true, maxLength: 512 },
  description: { type: String, maxLength: 4096 },
  category: { type: Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);
