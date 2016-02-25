'use strict';
// const Router = require('koa-router');
// let coiffeur = new Router({ prefix: 'coiffeur' });
//
// coiffeur.get('/', function *() {
//
// })
const routeBuilder = require('./routeBuilder');
const path = routeBuilder('coiffeurs');
// const Coiffeur = require('../models/coiffeur');
const Controller = require('../controllers/coiffeur');

/**
 * Adds two numbers together
 * @param {Router} router
 */
function coiffeurRoute(router) {
  router
    .get(path, Controller.getAll)
    .get(`${path}/:id`, Controller.get)
    .post(path, Controller.create)
    .put(`${path}/:id`, Controller.update)
    .delete(`${path}/:id`, Controller.remove);
}

// function coiffeurRoute(router) {
//   router
//   .get(path, function *(next) {
//     // this.body = { message: 'Gettin\' all dem coiffeurs!' };
//     try {
//       this.body = yield Controller.getAll();
//     } catch (e) {
//       this.status = 500;
//       console.error(e);
//       log.error(e);
//     } finally {
//       yield next;
//     }
//   })
//   .get(`${path}/:id`, function *(id, next) {
//     // this.body = { message: `Got coiffeur #${this.params.id}` };
//     try {
//       this.body = yield Controller.get(id);
//     } catch (e) {
//       this.status = 500;
//       console.error(e);
//       log.error(e);
//     } finally {
//       yield next;
//     }
//   })
//   .post(path, function *(next) {
//     // this.body = { name: 'Joe Bloe\'s Barbershop' };
//     try {
//       let coiffeur = yield Controller.create(this.request.body);
//       this.body = coiffeur;
//       this.status = 201;
//     } catch (e) {
//       this.status = 500;
//       console.error(e);
//       log.error(e);
//     } finally {
//       yield next;
//     }
//     yield next;
//   })
//   .put(`${path}/:id`, function *(next) {
//     // const id = this.params.id;
//     // let editedCoiffeur = this.
//     // this.body = {};
//     try {
//       yield Controller.update(this.request.body);
//       this.context.status = 201;
//     } catch (e) {
//       this.status = 500;
//       console.error(e);
//       log.error(e);
//     } finally {
//       yield next;
//     }
//   })
//   .delete(`${path}/:id`, function *(next) {
//     // const id = this.params.id;
//     // this.body = {};
//     try {
//       yield Controller.remove(this.params.id);
//       this.context.status = 200;
//     } catch (e) {
//       this.status = 500;
//       console.error(e);
//       log.error(e);
//     } finally {
//       yield next;
//     }
//   });
// }

module.exports = coiffeurRoute;
