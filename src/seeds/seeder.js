const config = require('../config')
const mongoose = require('mongoose')

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
const start = new Date()

const connect = async () => {
  try {
    mongoose.Promise = global.Promise
    return mongoose.connect(config.mongo.url)
  } catch (e) {
    console.log(e)
    throw e
  }
}

const coiffeur = async () => {
  try {
      // -- --grep="pattern"
    const coiffeurs = []
    for (let i = 0; i < 500; i++) {
      coiffeurs.push(CoiffeurFactory.build())
    }
    await Coiffeur.remove({}).exec()
    return Coiffeur.insertMany(coiffeurs)
  } catch (e) {
    console.error(e)
    throw e
  }
}

const shoppe = async (services = [], coiffeurs = []) => {
  try {
    const shoppes = []
    for (let i = 0; i < 500; i++) {
      const sRando = Math.floor(Math.random() * (services.length - 0 + 1)) + 0
      const slicedService = services.length > sRando ? services.slice(sRando) : []
      const cRando = Math.floor(Math.random() * (coiffeurs.length - 0 + 1)) + 0
      const slicedCoiffeur = coiffeurs.length > cRando ? coiffeurs.slice(cRando) : []
      shoppes.push(ShoppeFactory.build(slicedService.map(s => s._id), slicedCoiffeur.map(c => c._id)))
    }
    await Shoppe.remove({}).exec()
    return Shoppe.insertMany(shoppes)
  } catch (e) {
    console.error(e)
    throw e
  }
}

const serviceCategory = async () => {
  try {
    const serviceCategories = []
    for (let i = 0; i < 50; i++) {
      serviceCategories.push(ServiceCategoryFactory.build())
    }
    await ServiceCategory.remove({}).exec()
    return ServiceCategory.insertMany(serviceCategories)
  } catch (e) {
    console.error(e)
    throw e
  }
}

const service = async (serviceCategories = []) => {
  try {
    const services = []
    for (let i = 0; i < 100; i++) {
      const rando = Math.floor(Math.random() * (serviceCategories.length - 0 + 1)) + 0
      const serviceCat = serviceCategories.length > rando ? serviceCategories[rando] : serviceCategories[0]
      services.push(ServiceFactory.build(serviceCat._id))
    }
    await Service.remove({}).exec()
    return Service.insertMany(services)
  } catch (e) {
    console.error(e)
    throw e
  }
}

const question = async () => {
  try {
    const questions = []
    for (let i = 0; i < 20; i++) {
      questions.push(QuestionFactory.build())
    }
    await Question.remove({}).exec()
    return Question.insertMany(questions)
  } catch (e) {
    console.error(e)
    throw e
  }
}

const disconnect = async () => {
  try {
    console.log(`Time elapsed: ${(new Date() - start) / 1000}s`)
    return mongoose.disconnect()
  } catch (e) {
    console.error(e)
    throw e
  }
}

(async () => {
  try {
    await connect()
    const serviceCategories = await serviceCategory()
    console.log('Service Categories done.')
    const services = await service(serviceCategories)
    console.log('Service done..')
    const coiffeurs = await coiffeur()
    console.log('Coiffeurs done...')
    const shoppes = await shoppe(services, coiffeurs)
    console.log('Shoppes done....')
    const questions = await question()
    console.log('Questions done.....')
    await disconnect()
  } catch (e) {
    console.log(e)
  }
})()

