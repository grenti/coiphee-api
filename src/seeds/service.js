const faker = require('faker')

class ServiceFactory {
  static build (serviceCategoryId = '') {
    return {
      name: faker.name.findName(),
      description: faker.lorem.sentences(),
      category: serviceCategoryId,
      price: faker.commerce.price()
    }
  }
}

module.exports = exports = ServiceFactory
