const Joi = require('joi')
const factory = require('./joiResultFactory')

const schema = Joi.object().keys({
  street: Joi.string().min(8).max(256).required(),
  addtional: Joi.string().max(128),
  city: Joi.string().min(3).max(128).required(),
  state: Joi.string().min(2).max(2).required(),
  zip: Joi.string().min(5).max(10).regex(/[0-9]{5}|[0-9]{5}-[0-9]{4}/).required()
}).with('street', 'city', 'state', 'zip')

/**
 * Validates the correctness of a location object
 * @class {LocationValidator}
 * @type {LocationValidator}
 */
class LocationValidator {
  /**
   * Ensures that location object is valid per schema
   * @returns {Object} result Returns validation
   * result with status and validated object
   * @param {Object} location Location object to validate
   */
  static validate (location) {
    const result = Joi.validate(location, schema)
    return factory(result)
  }
}

module.exports = exports = LocationValidator
