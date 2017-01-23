const Router = require('koa-router')
// const routeBuilder = require('./routeBuilder')
// const path = routeBuilder('shoppes')
// const path = 'shoppes'
const Controller = require('../controllers/shoppe')
const shoppeRouter = new Router({
  prefix: '/shoppes'
})

shoppeRouter
  .get('/', Controller.getAll)
  .get('/:id', Controller.get)
  .post('/', Controller.create)
  .put('/:id', Controller.update)
  .delete('/:id', Controller.remove)

module.exports = shoppeRouter
