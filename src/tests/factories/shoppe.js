const faker = require('faker')

class ShoppeFactory {
  /**
   * @return {Object}
   */
  static build () {
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
        name: faker.lorem.words(),
        offering: [faker.lorem.sentence()]
      }]
    }
  }
}

module.exports = ShoppeFactory
