const Router = require('koa-router')
const authRouter = new Router({
  prefix: '/auth'
})

authRouter
  .post('/')
