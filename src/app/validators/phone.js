const Joi = require('joi')
const factory = require('./joiResultFactory')

const schema = Joi.object().keys({
  type: Joi.string().allow(['cell', 'home', 'office']).min(4).max(25).required(),
  number: Joi.string().min(10).max(10).regex(/[0 - 9]/).required()
}).with('type', 'number')

/**
 * Validator to ensure phone number validity
 */
class PhoneValidator {
  /**
   * Validates whether phone object is valid as necessary
   * @returns {Object} result Validation result and phone object
   * @param {Object} phone Phone object to be validated
   */
  static validate (phone) {
    const result = Joi.validate(phone, schema)
    return factory(result)
  }
}

module.exports = exports = PhoneValidator
