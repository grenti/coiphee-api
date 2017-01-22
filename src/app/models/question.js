const mongoose = require('mongoose')
const {Schema} = mongoose

const questionSchema = new Schema({
  title: { type: String, maxLength: 1024 },
  answer: { type: String }
})

module.exports = mongoose.model('Question', questionSchema)
