const Boom = require('boom')
const home = require('../app/routes/home')
const coiffeurs = require('../app/routes/coiffeurs')
const services = require('../app/routes/services')
const shoppes = require('../app/routes/shoppes')
const serviceCategories = require('../app/routes/serviceCategories')
const users = require('../app/routes/users')

const registry = app => {
  app
    .use(home.routes())
    .use(home.allowedMethods({
      throw: true,
      notImplemented() { return Boom.notImplemented() },
      methodNotAllowed() { return Boom.methodNotAllowed() }
    }))
    .use(coiffeurs.routes())
    .use(coiffeurs.allowedMethods({
      throw: true,
      notImplemented() { return Boom.notImplemented() },
      methodNotAllowed() { return Boom.methodNotAllowed() }
    }))
    .use(services.routes())
    .use(services.allowedMethods({
      throw: true,
      notImplemented() { return Boom.notImplemented() },
      methodNotAllowed() { return Boom.methodNotAllowed() }
    }))
    .use(shoppes.routes())
    .use(shoppes.allowedMethods({
      throw: true,
      notImplemented() { return Boom.notImplemented() },
      methodNotAllowed() { return Boom.methodNotAllowed() }
    }))
    .use(serviceCategories.routes())
    .use(serviceCategories.allowedMethods({
      throw: true,
      notImplemented() { return Boom.notImplemented() },
      methodNotAllowed() { return Boom.methodNotAllowed() }
    }))
    .use(users.routes())
    .use(users.allowedMethods({
      throw: true,
      notImplemented() { return Boom.notImplemented() },
      methodNotAllowed() { return Boom.methodNotAllowed() }
    }))
}

module.exports = registry
