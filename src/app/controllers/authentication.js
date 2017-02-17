const User = require('../models/user')
const jwt = require('koa-jwt')
const app = require('../appSetup')
const config = require('../../config')

class AuthController {
  static async authenticate(ctx, next) {
    try {
      const { body } = ctx
      const criteria = {
        logon: body.username,
        password: body.password
      }
      const user = await User.findOne(criteria).exec()

      if (!user) {
        ctx.status = 401
        ctx.body = {}
        console.error('User not found')
      } else if (user.password !== criteria.password) {
        ctx.status = 401
        ctx.body = {}
        console.error('User password incorrect')
        return
      } else {
        const token = jwt.sign(app.get('jwt'),
          { expiresInMinutes: config.webToken.duration })
        ctx.status = 200
        ctx.body = { token }
      }
    } catch (e) {
      ctx.status = 500
      console.error(e)
      // log.error(e)
    } finally {
      await next()
    }
  }
}

module.exports = exports = AuthController
