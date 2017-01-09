const Joi = require('joi')
const promisify = require('promisify-node')
const userSchema = require('../validators/user')
const User = require('../models/user')

class SessionController {
  static async create(ctx, next) {
    try {
      promisify(Joi)
      const valid = await Joi.validate(ctx.body, userSchema)
      if (!valid) { throw new Error('Validation Error') }
      
    } catch (error) {
      
    } finally {
      await next()
    }
  }
}
