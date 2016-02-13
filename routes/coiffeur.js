'use strict';

// const Router = require('koa-router');
// let coiffeur = new Router({ prefix: 'coiffeur' });
//
// coiffeur.get('/', function *() {
//
// })

const path = '/coiffeurs';

function coiffeurRoute(router) {
  router
  .get(path, function *(next) {
    this.body = { message: 'test it''s working!' };
  })
  .post(path, function *(next) {
    this.body = { name: 'Joe Bloe''s Barbershop' }
  });
}

module.exports = coifferRoute;
