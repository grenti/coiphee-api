'use strict';

const faker = require('faker');

class CoiffeurFactory {
  /**
   * @return {Object}
   */
  static build() {
    return {
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName()
      },
      license: [String],
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
      proficiencies: faker.lorem.words(),
      amenities: [{
        name: faker.lorem.words(),
        offering: [faker.lorem.words(), faker.lorem.words()]
      }]
    };
  }
}

module.exports = CoiffeurFactory;
