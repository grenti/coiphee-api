const faker = require('faker')

class ServiceCategorySeeder {
  static build () {
    return {
      name: faker.name.findName()
    }
  }
}

module.exports = exports = ServiceCategorySeeder
