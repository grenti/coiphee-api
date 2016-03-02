'use strict';

const Service = require('../models/service');
const Logger = require('bunyan');
const log = new Logger({name: 'ServiceController'});

class ServiceController {
  * getAll(next) {
    try {
      this.body = yield Service.find({}).exec();
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

  * get(next) {
    try {
      this.body = yield Service.find({_id: this.params.id}).exec();
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

  * create(next) {
    try {
      let newService = new Service(this.request.body);
      this.body = yield newService.save();
      this.status = 201;
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

  * update(next) {
    try {
      yield Service
        .findByIdAndUpdate({_id: this.params.id}, this.request.body).exec();
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }

  * remove(next) {
    try {
      yield Service.findByIdAndRemove({_id: this.params.id}).exec();
    } catch (e) {
      this.status = 500;
      log.error(e);
    } finally {
      yield next;
    }
  }
}

module.exports = new ServiceController();
