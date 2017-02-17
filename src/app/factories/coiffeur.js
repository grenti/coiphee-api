const PhoneValidator = require('../validators/phone')
const AmenityValidator = require('../validators/amenity')
const LocationValidator = require('../validators/location')
const NameValidator = require('../validators/name')

/**
 * Factory object responsible for building a valid coiffeur object
 * @class: CoiffeurFactory
 * @type: CoiffeurFactory
 */
class CoiffeurFactory {
  /**
   * Method to assemble a coiffeur object in a valid state for usage
   * @param {Object} coiffeur object with attributes to build a coiffeur object
   */
  static build (coiffeur) {
    const nameResult = NameValidator.validate(coiffeur.name || {})
    const phoneResults = (coiffeur.phone || []).map(p => PhoneValidator.validate(p || {}))
    const locationResult = LocationValidator.validate(coiffeur.location)
    const amenitiesResults = (coiffeur.amenities || []).map(a => AmenityValidator.validate(a))

    const pR = phoneResults.map(p => p.error)
    const aR = amenitiesResults.map(a => a.error)

    const clobbedResult = [
      nameResult.error,
      locationResult.error,
      ...pR,
      ...aR]

    if (clobbedResult.some(r => r)) {
      return clobbedResult.filter(r => r)
    }

    return {
      name: nameResult.object,
      license: coiffeur.license,
      phone: phoneResults.map(p => p.object),
      location: locationResult.object,
      proficiencies: coiffeur.proficiencies,
      amenities: amenitiesResults.map(a => a.object)
    }
  }
}

module.exports = exports = CoiffeurFactory
