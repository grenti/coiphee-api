const Joi = require('joi')
const factory = require('./joiResultFactory')

const schema = Joi.string().min(10).required()

class LicenseValidator {
  static validate (license) {
    const result = Joi.validate(license, schema)
    return factory(result)
  }
}

module.exports = exports = LicenseValidator
