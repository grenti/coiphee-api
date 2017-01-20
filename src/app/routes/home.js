const Router = require('koa-router')
const routeBuilder = require('./routeBuilder');
const path = routeBuilder('/');
const homeRouter = new Router({
  prefix: '/'
})

const content = `Welcome to Coiphee's api home!

Come in, let's get you coiffed!

We connect you to the best coiffeurs available in your area! Search for your
favorite coiffeur and manage your appointments, payments, reviews here!

Check us out!`;

homeRouter
  .get('/', async (ctx, next) => {
    ctx.body = content;
    await next()
  })
  // .get(path, async (ctx, next) => {
  //   ctx.body = content;
  //   await next()
  // })

module.exports = homeRouter
