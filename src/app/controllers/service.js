const Service = require('../models/service');
const Logger = require('bunyan');
const log = new Logger({ name: 'ServiceController' });

class ServiceController {
  static async getAll(ctx, next) {
    try {
      ctx.body = await Service.find({}).exec();
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next()
    }
  }

  static async get(ctx, next) {
    try {
      ctx.body = await Service.find({ _id: ctx.params.id }).exec();
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next()
    }
  }

  static async create(ctx, next) {
    try {
      let newService = new Service(ctx.request.body);
      ctx.body = await newService.save();
      ctx.status = 201;
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next()
    }
  }

  static async update(ctx, next) {
    try {
      await Service
        .findByIdAndUpdate({ _id: ctx.params.id }, ctx.request.body).exec();
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next()
    }
  }

  static async remove(ctx, next) {
    try {
      await Service.findByIdAndRemove({ _id: ctx.params.id }).exec();
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next()
    }
  }
}

module.exports = ServiceController
