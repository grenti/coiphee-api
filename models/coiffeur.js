
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let coiffeurSchema = new Schema({
  name: {
    first: { type: String, required: true },
    middle: String,
    last: { type: String, required: true }
  },
  license: [String],
  phone: [{
    type: { type: String, enum: ['cell', 'home', 'office'] },
    number: { type: String }
  }],
  location: {
    street: { type: String, required: true },
    addtional: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  proficiencies: [String],
  amenities: [{
    name: { type: String, required: true },
    offering: [{ type: String }]
  }]
});

module.exports = mongoose.model('Coiffeur', coiffeurSchema);
