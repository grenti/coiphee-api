const Service = require('../models/service')
const Logger = require('bunyan')
const log = new Logger({ name: 'ServiceController' })
const PageLinkFactory = require('./pageLinkFactory')

/**
 * Controller with handlers for Service routes
 *
 * @class {ServiceController}
 * @type {ServiceController}
 */
class ServiceController {
  static async gets(ctx, next) {
    try {
      let { page, rows } = ctx.request.query
      page = parseInt(page) || 1
      rows = parseInt(rows) || 25

      const services = await Service.find({})
        .skip((page * rows) - rows)
        .limit(page * rows).exec()
      const totalRecords = await Service.count()

      const meta = { route: 'services', data: services, page, rows, count: totalRecords }
      const { data, links, header } = PageLinkFactory.build(meta)

      ctx.body = totalRecords ? { data, links } : []
      ctx.set('X-Total-Count', totalRecords)
      if (totalRecords) {
        ctx.set('Link', header.link)
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
      ctx.body = await Service.find({ _id: ctx.params.id }).exec()
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async create(ctx, next) {
    try {
      let newService = new Service(ctx.request.body)
      ctx.body = await newService.save()
      ctx.status = 201
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async update(ctx, next) {
    try {
      await Service
        .findByIdAndUpdate({ _id: ctx.params.id }, ctx.request.body).exec()
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async remove(ctx, next) {
    try {
      await Service.findByIdAndRemove({ _id: ctx.params.id }).exec()
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }
}

module.exports = ServiceController
