'use strict';

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

  * getAll(next) {
    try {
      const shoppes = yield Shoppe.find({}).exec();
      console.log(`got to shoppe controller and returned: ${shoppes}`);
      this.body = shoppes;
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

  * get(next) {
    try {
      this.body = yield Shoppe.find({ _id: this.params.id }).exec();
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

  * create(next) {
    try {
      let newShoppe = new Shoppe(this.request.body);
      this.body = yield newShoppe.save();
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

  * update(next) {
    try {
      yield Shoppe.findByIdAndUpdate({ _id: this.params.id }, this.request.body).exec();
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

  * remove(next) {
    try {
      yield Shoppe.findByIdAndRemove({ _id: this.params.id }).exec();
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

}

module.exports = new ShoppeController();
