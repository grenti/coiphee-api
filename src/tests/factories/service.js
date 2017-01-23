const faker = require('faker')

class ServiceFactory {
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
