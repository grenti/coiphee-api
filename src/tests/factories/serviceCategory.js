const faker = require('faker')

/**
 * Test factory to generate ServiceCategory data
 */
class ServiceCategoryFactory {
  /**
   * method creating new ServiceCategory
   * @returns {Object} new ServiceCategory object
   */
  static build () {
    return {
      name: faker.commerce.product()
    }
  }
}

module.exports = ServiceCategoryFactory
