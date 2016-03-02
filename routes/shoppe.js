'use strict';

const routeBuilder = require('./routeBuilder');
const path = routeBuilder('shoppes');
const Controller = require('../controllers/shoppe');

/**
 * configures routes for shoppes
 * @param {Router} router
 */
function shoppeRoute(router) {
  router
    .get(path, Controller.getAll)
    .get(`${path}/:id`, Controller.get)
    .post(path, Controller.create)
    .put(`${path}/:id`, Controller.update)
    .delete(`${path}/:id`, Controller.remove);
}

module.exports = shoppeRoute;
