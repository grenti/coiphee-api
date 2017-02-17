const Router = require('koa-router')
const routeBuilder = require('./routeBuilder')
const path = routeBuilder('users')

const Controller = require('../controllers/user')
const userRouter = new Router({ prefix: path })

userRouter
  .get('/', Controller.gets)
  .get('/:id', Controller.get)
  .post('/', Controller.create)
  .put('/:id', Controller.update)
  .delete('/:id', Controller.remove)

module.exports = userRouter
