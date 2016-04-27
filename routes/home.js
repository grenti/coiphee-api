const routeBuilder = require('./routeBuilder');
const path = routeBuilder('/');

const content = `Welcome to Coiphee's api home!

Come in, let's get you coiffed!

We connect you to the best coiffeurs available in your area! Search for your
favorite coiffeur and manage your appointments, payments, reviews here!

Check us out!`;
/**
 * Adds two numbers together
 *
 * @param {Router} router
 */
function homeRoute(router) {
  router
  .get('/', function *(next) {
    this.body = content;
  })
  .get(path, function *(next) {
    this.body = content;
  });
}

module.exports = homeRoute;
