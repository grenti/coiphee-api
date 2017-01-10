const test = require('tape')

const defFn = () => {
}

/**
 * Wrapper method to provide setup and teardown for tape tests
 * @param {string} description The description of the test behavior being tested
 * @param {function} fn The function used in the test fixture
 * @param {function} setup The method to run the setup action before running the test
 * @param {function} teardown The method to teardown and reset anything performed in the setup method
 */
function taper (description = '' , fn = defFn , setup = defFn , teardown = defFn) {
  test(description, t => {
    if (setup && typeof setup === 'function') {
      setup()
    }

    fn(t)

    if (teardown && typeof teardown === 'function') {
      teardown()
    }
  })
}

module.exports = taper
