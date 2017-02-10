const faker = require('faker')

class ShoppeFactory {
  /**
   * @return {Object}
   */
  static build (services = [], coiffeurs = []) {
    return {
      name: faker.name.findName(),
      description: faker.lorem.sentences(),
      phone: [{
        type: 'office',
        number: faker.phone.phoneNumber()
      }],
      paymentTypes: ['Cash', 'Visa', 'MasterCard', 'American Express', 'Discover'],
      walkInAccepted: true,
      location: {
        street: faker.address.streetAddress(),
        addtional: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode()
      },
      amenities: [{
        name: faker.lorem.word(),
        offering: [faker.lorem.sentence()]
      }],
      services: services,
      coiffeurs: coiffeurs
    }
  }
}

module.exports = ShoppeFactory
