const User = require('../models/user')
const jwt = require('koa-jwt')
const app = require('../server')

class AuthController {
  static async sesssion(ctx, next) {
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
        return
      }

      if (user.password !== criteria.password) {
        ctx.status = 401
        ctx.body = {}
        console.error('User password incorrect')
        return
      }

      const token = jwt.sign(app.get('na-so-so-ndolo'))      
      ctx.status = 200
      ctx.body = { token }
    } catch (error) {
      
    } finally {
      await next()
    }
  }
}
