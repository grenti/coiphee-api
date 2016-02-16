// const Router = require('koa-router');
// let coiffeur = new Router({ prefix: 'coiffeur' });
//
// coiffeur.get('/', function *() {
//
// })
const routeBuilder = require('./routeBuilder');
const path = routeBuilder('coiffeurs');
// const Coiffeur = require('../models/coiffeur');

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
  })
  .put(`${path}/:id`, function *(next) {
    const id = this.params.id;
    let editedCoiffeur = this.
    this.body = {};
  });
}

module.exports = coiffeurRoute;
