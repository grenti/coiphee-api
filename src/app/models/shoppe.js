const mongoose = require('mongoose')
const { Schema } = mongoose
const { PAYMENT_TYPES } = require('../constants/constants')

const shoppeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  phone: [{
    type: { type: String, enum: ['cell', 'home', 'office'] },
    number: { type: String }
  }],
  paymentTypes: [{
    type: String,
    enum: Object.values(PAYMENT_TYPES),
    required: true
  }],
  walkInAccepted: { type: Boolean, required: true },
  location: {
    street: { type: String, required: true },
    addtional: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  amenities: [{
    name: { type: String, required: true },
    offering: [{ type: String }]
  }],
  coiffeurs: [{ type: Schema.Types.ObjectId, ref: 'Coiffeur' }],
  services: [{ type: Schema.Types.ObjectId, ref: 'Services' }]
})

module.exports = mongoose.model('Shoppe', shoppeSchema)
