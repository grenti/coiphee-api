const Router = require('koa-router')
const routeBuilder = require('./routeBuilder')
// const path = routeBuilder('shoppes')
const path = 'shoppes'
const Controller = require('../controllers/shoppe')
const shoppeRouter = new Router({
  prefix: '/shoppes'
})

shoppeRouter
  .get(path, Controller.getAll)
  .get(`${path}/:id`, Controller.get)
  .post(path, Controller.create)
  .put(`${path}/:id`, Controller.update)
  .delete(`${path}/:id`, Controller.remove)

module.exports = shoppeRouter
