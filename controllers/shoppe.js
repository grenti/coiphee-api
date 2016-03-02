'use strict';
const Shoppe = require('../models/shoppe');
const Logger = require('bunyan');
const log = new Logger({name: 'ShoppeController'});

/**
 * Shoppe Controller to manage Shoppe interactions
 * @class
 * @type {ShoppeController}
 */
function ShoppeController() {};

ShoppeController.prototype.getAll = function* (next) {
  try {
    this.body = yield Shoppe.find({}).exec();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

ShoppeController.prototype.get = function* (next) {
  try {
    this.body = yield Shoppe.find({_id: this.params.id}).exec();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

ShoppeController.prototype.create = function* (next) {
  try {
    let newShoppe = new Shoppe(this.request.body);
    this.body = yield newShoppe.save();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

ShoppeController.prototype.update = function* (next) {
  try {
    yield Shoppe.findByIdAndUpdate({_id: this.params.id}, this.request.body).exec();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

ShoppeController.prototype.remove = function* (next) {
  try {
    yield Shoppe.findByIdAndRemove({_id: this.params.id}).exec();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

module.exports = new ShoppeController();
