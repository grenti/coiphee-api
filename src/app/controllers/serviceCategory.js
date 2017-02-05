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
      const serviceCategory = await ServiceCategory.findOne({ _id: ctx.params.id }).exec()
      if (serviceCategory) {
        ctx.status = 200
        ctx.body = serviceCategory
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
      let newServiceCategory = new ServiceCategory(ctx.request.body)
      ctx.body = await newServiceCategory.save()
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
      const {id} = ctx.params
      const {body} = ctx.request
      if (id) {
        await ServiceCategory
          .findByIdAndUpdate({ _id: id }, body).exec()
        ctx.status = 200
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
        await ServiceCategory
          .findByIdAndRemove({ _id: id }).exec()
        ctx.status = 200
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

module.exports = ServiceCategoryController
