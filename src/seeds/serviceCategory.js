const faker = require('faker')

class ServiceCategoryFactory {
  static build () {
    return {
      name: faker.name.findName()
    }
  }
}

module.exports = exports = ServiceCategoryFactory
