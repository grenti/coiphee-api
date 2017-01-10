const Router = require('koa-router')
const routeBuilder = require('./routeBuilder')
// const path = routeBuilder('servicecategories')
const path = 'servicecategories'
const Controller = require('../controllers/serviceCategory')
const serviceCategoryRouter = new Router({
  prefix: '/serviceCategories'
})

serviceCategoryRouter
  .get('/', Controller.getAll)
  .get(`/:id`, Controller.get)
  .post('/', Controller.create)
  .put(`/:id`, Controller.update)
  .delete(`/:id`, Controller.remove)

module.exports = serviceCategoryRouter
