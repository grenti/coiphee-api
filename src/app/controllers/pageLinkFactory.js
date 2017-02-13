const config = require('../../config')
const routeBuilder = require('../routes/routeBuilder')

/**
 * Factory object that builds the paged collection results for a
 * gets route handler and it's header link
 * @class {PageLinkFactory}
 * @type {PageLinkFactory}
 */
class PageLinkFactory {
  /**
   * Factory method that builds a paged collection result for a
   * route handler and it's header link
   * @returns {Object} result response with header link information
   * @param {Object} Object Route data information for results
   */
  static build ({ route = '', data = [], page = 1, rows = 25, count = 0 }) {
    const path = routeBuilder(route)
    const result = {
      data,
      links: {
        first: `${config.uri()}${path}?page=1&rows=${rows}`,
        previous: `${config.uri()}${path}?page=${page - 1 === 0 ? page : page - 1}&offset=${rows}`,
        next: `${config.uri()}${path}?page=${Math.ceil(count / rows) === page ? page : page + 1}&rows=${rows}`,
        last: `${config.uri()}${path}?page=${Math.ceil(count / rows)}&offset=${rows}`
      },
      header: {
        link: `<${config.uri()}/coiffeurs?page=${Math.ceil(count / rows) === page ? page : page + 1}&rows=${rows}>; rel="next"`
      }
    }
    console.log(config.uri())
    return result
  }
}

module.exports = exports = PageLinkFactory
