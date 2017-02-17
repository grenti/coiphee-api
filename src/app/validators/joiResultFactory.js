module.exports = exports = resultFactory

/**
 * Function which parses the Joi validation result
 * and returns the result if valid or plucks out
 * the error if invalid
 * @param {Object?} result Joi validation Result object
 * @returns {Object} error and original object | validated object
 */
function resultFactory (result = {}) {
  if (result.error) {
    const {details} = result.error
    const {value} = result
    return {
      error: details[0],
      object: value
    }
  }
  return result.value
}
