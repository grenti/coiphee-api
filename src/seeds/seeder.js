const mongooseSetup = require('../config/mongoose')

const Coiffeur = require('../app/models/coiffeur')

const CoiffeurFactory = require('./coiffeur');

(async function seeder() {
    // -- --grep="pattern"
  const start = new Date()
  process.env.NODE_ENV = 'development'
  mongooseSetup.connect()

  const coiffeurs = []
  for (let i = 0; i < 500; i++) {
    coiffeurs.push(CoiffeurFactory.build())
  }
  await Coiffeur.remove({}).exec()
  const savedCoiffeurs = await Coiffeur.insertMany(coiffeurs)
  console.log(`Finished seeding coiffeurs: ${savedCoiffeurs}`)
  await mongooseSetup.disconnect()
  console.log(`Time elapsed: ${(new Date() - start) / 1000}s`)
})()

