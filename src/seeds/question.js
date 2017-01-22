const faker = require('faker')

class QuestionSeeder {
  static build () {
    return {
      title: faker.lorem.sentence() + '?',
      answer: faker.lorem.sentences()
    }
  }
}

module.exports = exports = QuestionSeeder
