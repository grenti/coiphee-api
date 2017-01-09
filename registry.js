const Boom = require('boom')
const home = require('./routes/home')
const coiffeurs = require('./routes/coiffeurs')
const services = require('./routes/services')
const shoppes = require('./routes/shoppes')
const serviceCategories = require('./routes/serviceCategories')

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
}

module.exports = registry
