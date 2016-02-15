// const Router = require('koa-router');
// let coiffeur = new Router({ prefix: 'coiffeur' });
//
// coiffeur.get('/', function *() {
//
// })
const routeBuilder = require('./routeBuilder');
const path = routeBuilder('coiffeurs');

/**
 * Adds two numbers together
 * @param {Router} router
 */
function coiffeurRoute(router) {
  router
  .get(path, function *(next) {
    this.body = { message: 'Gettin\' all dem coiffeurs!' };
  })
  .get(`${path}/:id`, function *(id, next) {
    this.body = { message: `Got coiffeur #${this.params.id}` };
  })
  .post(path, function *(next) {
    this.body = { name: 'Joe Bloe\'s Barbershop' };
  });
}

module.exports = coiffeurRoute;
