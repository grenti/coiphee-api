const Joi = require('joi')

const userSchema = Joi.object().keys({
  name: Joi.object().keys({
    first: Joi.string().min(3).max(25).required(),
    last: Joi.string().min(3).max(25).required()
  }),
  logon: Joi.string().alphanum().min(6).max(12).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9{3,30}$]/),
  access: Joi.object().keys({
    token: [Joi.string(), Joi.number()],
    exiration: Joi.date().required()
  }),
  birthdate: Joi.date().min('1-1-1917').required(),
  email: Joi.string().email()
})

module.exports = userSchema
