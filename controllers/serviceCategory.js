'use strict';

const Logger = require('bunyan');
const log = new Logger({name: 'ServiceCategoryController'});
const ServiceCategory = require('../models/servicecategory');

/**
 * ServiceCategory controller which manages actions on ServiceCategories
 *
 * @class
 * @type {ServiceCategoryController}
 */
function ServiceCategoryController() {};

ServiceCategoryController.prototype.getAll = function *(next) {
  try {
    this.body = yield ServiceCategory.find({}).exec();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

ServiceCategoryController.prototype.get = function *(next) {
  try {
    this.body = yield ServiceCategory.find({_id: this.params.id}).exec();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

ServiceCategoryController.prototype.create = function *(next) {
  try {
    let newServiceCategory = new ServiceCategory(this.request.body);
    this.body = yield newServiceCategory.save();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

ServiceCategoryController.prototype.update = function *(next) {
  try {
    ServiceCategory
      .findByIdAndUpdate({_id: this.params.id}, this.request.body).exec();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

ServiceCategoryController.prototype.remove = function *(next) {
  try {
    ServiceCategory
      .findByIdAndRemove({_id: this.params.id}).exec();
  } catch (e) {
    this.status = 500;
    log.error(e);
  } finally {
    yield next;
  }
};

module.exports = new ServiceCategoryController();
