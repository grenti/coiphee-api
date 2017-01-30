const Logger = require('bunyan')
const log = new Logger({ name: 'ServiceCategoryController' })
const ServiceCategory = require('../models/serviceCategory')

/**
 * ServiceCategory controller which manages actions on ServiceCategories
 *
 * @class {ServiceCategoryController}
 * @type {ServiceCategoryController}
 */
class ServiceCategoryController {
  static async getAll(ctx, next) {
    try {
      ctx.body = await ServiceCategory.find({}).exec()
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async get(ctx, next) {
    try {
      ctx.body = await ServiceCategory.find({ _id: ctx.params.id }).exec()
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async create(ctx, next) {
    try {
      let newServiceCategory = new ServiceCategory(ctx.request.body)
      ctx.body = await newServiceCategory.save()
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

  static async update(ctx, next) {
    try {
      ServiceCategory
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
      ServiceCategory
        .findByIdAndRemove({ _id: ctx.params.id }).exec()
    } catch (e) {
      ctx.status = 500
      log.error(e)
    } finally {
      await next()
    }
  }

}

module.exports = ServiceCategoryController
