const Router = require('koa-router')
const routeBuilder = require('./routeBuilder')
// const path = routeBuilder('coiffeurs')
const path = '/coiffeurs'
const Controller = require('../controllers/coiffeur')
const coiffeurRouter = new Router({
  prefix: '/coiffeurs'
})

coiffeurRouter
  .get('/', Controller.getAll)
  .get(`/:id`, Controller.get)
  .post('/', Controller.create)
  .put(`/:id`, Controller.update)
  .delete(`/:id`, Controller.remove)

module.exports = coiffeurRouter
