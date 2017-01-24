const faker = require('faker')

/**
 * Test factory to create Service test data
 */
class ServiceFactory {
  /**
   * method creating new Service
   * @returns {Object} new Service object
   */
  static build () {
    return {
      name: faker.name.findName(),
      description: faker.lorem.paragraph(),
      category: {},
      price: faker.commerce.price()
    }
  }
}

module.exports = ServiceFactory
