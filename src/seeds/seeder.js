const mongooseSetup = require('../config/mongoose')

const Coiffeur = require('../app/models/coiffeur')
const Shoppe = require('../app/models/shoppe')
const ServiceCategory = require('../app/models/serviceCategory')
const Service = require('../app/models/service')
const Question = require('../app/models/question')

const CoiffeurFactory = require('./coiffeur')
const ShoppeFactory = require('./shoppe')
const ServiceCategoryFactory = require('./serviceCategory')
const ServiceFactory = require('./service')
const QuestionFactory = require('./question')

process.env.NODE_ENV = 'development'
const start = new Date();

(async function connect() {
  mongooseSetup.connect()
})();

(async function coiffeur() {
  try {
      // -- --grep="pattern"
  // const start = new Date()

    const coiffeurs = []
    for (let i = 0; i < 500; i++) {
      coiffeurs.push(CoiffeurFactory.build())
    }
    await Coiffeur.remove({}).exec()
    const savedCoiffeurs = await Coiffeur.insertMany(coiffeurs)
    console.log(`Finished seeding coiffeurs: ${savedCoiffeurs}`)
    await mongooseSetup.disconnect()
  // console.log(`Time elapsed: ${(new Date() - start) / 1000}s`)
  } catch (e) {
    console.error(e)
    throw e
  }
})();

(async function shoppe() {
  try {
    const shoppes = []
    for (let i = 0; i < 500; i++) {
      shoppes.push(ShoppeFactory.build())
    }
    await Shoppe.remove({}).exec()
    const savedShoppes = await Shoppe.insertMany(shoppes)
    console.log(`Finished seeding shoppes: ${savedShoppes}`)
  } catch (e) {
    console.error(e)
    throw e
  }
})();

(async function serviceCategory() {
  try {
    const serviceCategories = []
    for (let i = 0; i < 50; i++) {
      serviceCategories.push(ServiceCategoryFactory.build())
    }
    await ServiceCategory.remove({}).exec()
    const savedServiceCategories = await ServiceCategory.insertMany(serviceCategories)
    console.log(`Finished seeding serviceCategories: ${savedServiceCategories}`)
  } catch (e) {
    console.error(e)
    throw e
  }
})();

(async function question() {
  try {
    const questions = []
    for (let i = 0; i < 20; i++) {
      questions.push(QuestionFactory.build())
    }
    await Question.remove({}).exec()
    const savedQuestions = await Question.insertMany(questions)
    console.log(`Finished seeding coiffeurs: ${savedQuestions}`)
  } catch (e) {
    console.error(e)
    throw e
  }
})()

// (async function disconnect() {
//   try {
//     await mongooseSetup.disconnect()
//     console.log(`Time elapsed: ${(new Date() - start) / 1000}s`)
//   } catch (e) {
//     console.error(e)
//     throw e
//   }
// })()
mongooseSetup.disconnect()
console.log(`Time elapsed: ${(new Date() - start) / 1000}s`)

