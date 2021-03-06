const faker = require('faker')

class ServiceSeeder {
  static build (serviceCategoryId = '') {
    const svc = {
      name: faker.name.findName(),
      description: faker.lorem.sentences(),
      price: faker.commerce.price()
    }
    if (serviceCategoryId) {
      svc.category = serviceCategoryId
    }
    return svc
  }
}

module.exports = exports = ServiceSeeder
