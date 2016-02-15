const path = '/';

/**
 * Adds two numbers together
 * @param {Router} router
 */
function homeRoute(router) {
  router
  .get(path, function *(next) {
    this.body = `Welcome to Coiphee's api home!\n Let's play!`;
  });
}

module.exports = homeRoute;
