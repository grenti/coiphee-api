const Joi = require('joi')
const factory = require('./joiResultFactory')

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(25).required(),
  offering: Joi.array().items(Joi.string()).min(1).required()
}).with('name', 'offering')

/**
 * Validates the correctness of an amenity object
 * @class {AmenityValidator}
 * @type {AmenityValidator}
 */
class AmenityValidator {
  /**
   * Ensures that amenity object is valid per schema
   * @returns {Object} result Returns validation
   * result with status and validated object
   * @param {Object} amenity Amenity object to validate
   */
  static validate (amenity) {
    const result = Joi.validate(amenity, schema)
    return factory(result)
  }
}

module.exports = exports = AmenityValidator
