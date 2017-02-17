const PhoneValidator = require('../validators/phone')

/**
 * Factory which builds a phone object in the appropriate state
 * @class {PhoneFactory}
 * @type {PhoneFactory}
 */
class PhoneFactory {
  /**
   * Builds phone by validating it and returning a result and the validated object
   * @returns {Object} result Validation result and validated object
   * @param {Object} phone Phone object internals
   */
  static build (phone) {
    return PhoneValidator.validate(phone)
  }
}

module.exports = exports = PhoneFactory
