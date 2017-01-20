
var all = require('./environments/all');
var defaultEnvironment = process.env.NODE_ENV || 'development';
var defaultConfigPath = './environments/' + defaultEnvironment;
var environment = require(defaultConfigPath);

/**
 * @param {string} name
 *
 */
// function requiredProcessEnv(name) {
//   if (!process.env[name]) {
//     throw new Error('You must set the ' + name + ' environment variable');
//   }
//   return process.env[name];
// }

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = Object.assign(all, environment || {});
