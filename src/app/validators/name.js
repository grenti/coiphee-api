const Joi = require('joi')
const factory = require('./joiResultFactory')

const schema = Joi.object().keys({
  first: Joi.string().min(1).max(50).required(),
  middle: Joi.string().max(50),
  last: Joi.string().min(2).max(50).required()
}).with('first', 'last')

/**
 * Validates the correctness of a name object
 * @class {NameValidator}
 * @type {NameValidator}
 */
class NameValidator {
  /**
   * Ensures that name object is valid per schema
   * @returns {Object} result Returns validation
   * result with status and validated object
   * @param {Object} name Name object to validate
   */
  static validate (name) {
    const result = Joi.validate(name, schema)
    return factory(result)
  }
}

module.exports = exports = NameValidator
