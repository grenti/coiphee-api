const Shoppe = require('../models/shoppe')
const Logger = require('bunyan')
const log = new Logger({ name: 'ShoppeController' })

/**
 * Shoppe Controller to manage Shoppe interactions
 *
 * @class {ShoppeController}
 * @type {ShoppeController}
 */
class ShoppeController {

  static async getAll(ctx, next) {
    try {
      const shoppes = await Shoppe.find({}).exec()
      // console.log(`got to shoppe controller and returned: ${shoppes}`)
      ctx.body = shoppes
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async get(ctx, next) {
    try {
      const shoppe = await Shoppe.findOne({ _id: ctx.params.id }).exec()
      if (shoppe) {
        ctx.body = shoppe
      } else {
        ctx.status = 404
      }
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async create(ctx, next) {
    try {
      let newShoppe = new Shoppe(ctx.request.body)
      ctx.status = 201
      ctx.body = await newShoppe.save()
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async update(ctx, next) {
    try {
      const {id} = ctx.params
      const {body} = ctx.request
      if (id) {
        const shoppe = await Shoppe.findByIdAndUpdate({ _id: id }, body).exec()
        ctx.status = shoppe ? 200 : 404
        ctx.body = shoppe ? {} : {errors: [{message: 'Not Found'}]}
      } else {
        ctx.status = 422
        ctx.body = {errors: [{message: 'Bad Request'}]}
      }
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async remove(ctx, next) {
    try {
      const {id} = ctx.params
      if (id) {
        const shoppe = await Shoppe.findByIdAndRemove({ _id: id }).exec()
        ctx.status = shoppe ? 200 : 404
        ctx.body = shoppe ? {} : {errors: [{message: 'Not Found'}]}
      } else {
        ctx.status = 422
        ctx.body = {errors: [{message: 'Bad Request'}]}
      }
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

}

module.exports = ShoppeController
