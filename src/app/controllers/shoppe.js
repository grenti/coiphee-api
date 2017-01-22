const config = require('../../config')
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

  static async gets(ctx, next) {
    try {
      let { page, rows } = ctx.request.query
      page = parseInt(page || 1)
      rows = parseInt(rows || 25)

      const shoppes = await Shoppe.find({})
        .skip((page * rows) - rows)
        .limit(page * rows)
        .exec()
      const totalRecords = await Shoppe.count()

      const result = {
        data: shoppes,
        links: {
          first: `/coiffeurs?page=1&rows=${rows}`,
          previous: `/coiffeurs?page=${page - 1 === 0 ? page : page - 1}&offset=${rows}`,
          next: `/coiffeurs?page=${page + 1}&rows=${rows}`,
          last: `/coiffeurs?page=${Math.ceil(totalRecords / rows)}&offset=${rows}`
        }
      }

      ctx.body = totalRecords ? result : []
      ctx.set('X-Total-Count', totalRecords)
      if (totalRecords) {
        ctx.set('Link', `<http://localhost:${config.port}/coiffeurs?page=${page + 1}&rows=${rows}>; rel="next"`)
      }
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
