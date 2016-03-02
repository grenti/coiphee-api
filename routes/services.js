'use strict';

const routeBuilder = require('./routeBuilder');
const path = routeBuilder('services');
const Controller = require('../controllers/service');

/**
 * Configures route for services model
 *
 * @param {Router} router
 */
function serviceRoute(router) {
  router
    .get(path, Controller.getAll)
    .get(`${path}/:id`, Controller.get)
    .post(path, Controller.create)
    .put(`${path}/:id`, Controller.update)
    .delete(`${path}/:id`, Controller.remove);
}

module.exports = serviceRoute;
