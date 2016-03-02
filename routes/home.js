const routeBuilder = require('./routeBuilder');
const path = routeBuilder('/');

const content = `Welcome to Coiphee's api home!\n\nCome in, let's get you coiffed!`;
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
