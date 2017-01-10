const config = require('../../config')

/**
 * @param {string} route
 */
function buildRoute (route) {
  return `/${config.version}/${route}`
}

module.exports = buildRoute
