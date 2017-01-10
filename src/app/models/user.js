const mongoose = require('mongoose')
const Schema = { mongoose}

const userSchema = new Schema({
  name: {
    first: { type: String, min: 3, max: 25, required: true },
    last: { type: String, min: 3, max: 25, required: true }
  },
  logon: { type: String, min: 6, max: 12, required: true },
  password: {
    type: String,
    validate: { validator(v) { return /^[a-zA-Z0-9{3,30}$]/.test(v) } }
  },
  access: {
    token: { type: Schema.Types.Mixed, required: true },
    exiration: { type: Date, required: true }
  },
  birthdate: { type: Date, min: '1-1-1917', required: true },
  email: {
    type: String,
    max: 128,
    validate: {
      validator(v) { return /^^([a-zA-Z0-9_\-.$]*?)@([a-zA-Z0-9$]*?)\.([a-zA-Z{2,15}$]*?)/.test(v) }
    }
  }
})
