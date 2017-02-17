const mongoose = require('mongoose')
const BCrypt = require('bcrypt')
const {Schema} = mongoose
const SALT_WORK_FACTOR = 10

// TODO: Add BCrypt module for password
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

userSchema.pre('save', next => {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  BCrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    // hash the password along with our new salt
    BCrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = (candidatePassword, cb) => {
  BCrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

module.exports = exports = mongoose.model('User', userSchema)
