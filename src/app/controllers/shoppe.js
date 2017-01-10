const Shoppe = require('../models/shoppe');
const Logger = require('bunyan');
const log = new Logger({ name: 'ShoppeController' });

/**
 * Shoppe Controller to manage Shoppe interactions
 *
 * @class
 * @type {ShoppeController}
 */
class ShoppeController {

  static async getAll(ctx, next) {
    try {
      const shoppes = await Shoppe.find({}).exec();
      console.log(`got to shoppe controller and returned: ${shoppes}`);
      ctx.body = shoppes;
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next();
    }
  }

  static async get(ctx, next) {
    try {
      ctx.body = await Shoppe.find({ _id: ctx.params.id }).exec();
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next();
    }
  }

  static async create(ctx, next) {
    try {
      let newShoppe = new Shoppe(ctx.request.body);
      ctx.body = await newShoppe.save();
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next();
    }
  }

  static async update(ctx, next) {
    try {
      await Shoppe.findByIdAndUpdate({ _id: ctx.params.id }, ctx.request.body).exec();
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next();
    }
  }

  static async remove(ctx, next) {
    try {
      await Shoppe.findByIdAndRemove({ _id: ctx.params.id }).exec();
    } catch (e) {
      ctx.status = 500;
      log.error(e);
    } finally {
      await next();
    }
  }

}

module.exports = ShoppeController
