const Router = require('koa-router')
const routeBuilder = require('./routeBuilder')
const path = routeBuilder('services')
// const path = 'services'
const Controller = require('../controllers/service')
const serviceRouter = new Router({
  prefix: path
})

serviceRouter
  .get('/', Controller.gets)
  .get('/:id', Controller.get)
  .post('/', Controller.create)
  .put('/:id', Controller.update)
  .delete('/:id', Controller.remove)

module.exports = serviceRouter
