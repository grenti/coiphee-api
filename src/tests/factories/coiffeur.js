const faker = require('faker')

class CoiffeurFactory {
  /**
   * Assembles a coiffeur in a valid state and returns a result
   * detailing errors and / or the coiffeur object
   * @returns {Object}
   */
  static build () {
    return {
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName()
      },
      license: faker.helpers.replaceSymbolWithNumber('####-###-####'),
      phone: [{
        type: 'home',
        number: faker.phone.phoneNumber()
      }],
      location: {
        street: faker.address.streetAddress(),
        addtional: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode()
      },
      proficiencies: faker.lorem.words().split(' '),
      amenities: [{
        name: faker.lorem.word(),
        offering: [faker.random.words().split(' ')]
      }, {
        name: faker.lorem.word(),
        offering: [faker.random.words().split(' ')]
      }]
    }
  }
}

module.exports = CoiffeurFactory
