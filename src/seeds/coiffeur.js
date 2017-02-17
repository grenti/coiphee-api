const faker = require('faker')

class CoiffeurSeeder {
  static build () {
    return {
      name: {
        first: faker.name.firstName(),
        middle: faker.name.firstName(),
        last: faker.name.lastName()
      },
      license: faker.helpers.replaceSymbolWithNumber('####-###-####'),
      phone: [{
        type: 'home',
        number: faker.phone.phoneNumber()
      }],
      location: {
        street: faker.address.streetName(),
        addtional: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode()
      },
      proficiencies: faker.lorem.words().split(' '),
      amenities: [{
        name: faker.lorem.word(),
        offering: faker.lorem.words().split(' ')
      }]
    }
  }
}

module.exports = CoiffeurSeeder
