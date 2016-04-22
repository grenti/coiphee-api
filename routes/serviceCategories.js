'use strict';

const routeBuilder = require('./routeBuilder');
const path = routeBuilder('servicecategories');
const Controller = require('../controllers/serviceCategory');

/**
 * Configures route for servicecategories
 *
 * @param {Router} router
 */
function serviceCategoryRoute(router) {
  router
    .get(path, Controller.getAll)
    .get(`${path}/:id`, Controller.get)
    .post(path, Controller.create)
    .put(`${path}/:id`, Controller.update)
    .delete(`${path}/:id`, Controller.remove);
}

module.exports = serviceCategoryRoute;
