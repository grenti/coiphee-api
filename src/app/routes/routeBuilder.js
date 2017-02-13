const config = require('../../config')

/**
 * Method to build a route for a handler with the appropriate
 * app version in use
 * @param {string} route
 */
function buildRoute (route) {
  return `/${config.version}/${route}`
}

module.exports = buildRoute
