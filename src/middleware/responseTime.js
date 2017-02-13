const Logger = require('bunyan')
const log = new Logger({ name: 'koa-access' })

class ResponseTime {
  /**
   * Async middleware to record response time for handlers
   * @param ctx {Object} Koa Context Object
   * @param next {function} next middleware function
   */
  static async setHeader(ctx, next) {
    let start = new Date()
    await next()
    const ms = new Date() - start
    ctx.set('X-Response-Time', `${ms}ms`)
  }
  /**
   * Async middleware to log response time for handlers
   * @param ctx {Object} Koa Context Object
   * @param next {function} next middleware function
   */
  static async setLogger(ctx, next) {
    let start = new Date()
    await next()
    const ms = new Date() - start
    log.info('%s %s - %sms', ctx.method, ctx.url, ms)
  }
}

module.exports = ResponseTime
