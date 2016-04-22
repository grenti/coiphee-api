'use strict';

const routeBuilder = require('./routeBuilder');
const path = routeBuilder('coiffeurs');
// const Coiffeur = require('../models/coiffeur');
const Controller = require('../controllers/coiffeur');

/**
 * Adds two numbers together
 *
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

module.exports = coiffeurRoute;
