const faker = require('faker')

class QuestionFactory {
  static build () {
    return {
      title: faker.lorem.sentence() + '?',
      answer: faker.lorem.sentences()
    }
  }
}

module.exports = exports = QuestionFactory
