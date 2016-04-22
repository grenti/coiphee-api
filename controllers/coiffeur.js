
'use strict';

const Coiffeur = require('../models/coiffeur');
const Logger = require('bunyan');
const log = new Logger({ name: 'CoiffeurController' });

/**
 * Coiffeur Controller for Coiffeur routes
 *
 * @class
 * @type {CoiffeurController}
 */
class CoiffeurController {
  * getAll(next) {
    try {
      this.body = yield Coiffeur.find({}).exec();
    } catch (e) {
      this.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      yield next;
    }
  }

  * get(next) {
    try {
      this.body = yield Coiffeur.find({ _id: this.params.id }).exec();
    } catch (e) {
      this.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      yield next;
    }
  }

  * create(next) {
    try {
      var newCoiffeur = new Coiffeur(this.request.body);
      this.body = yield newCoiffeur.save();
      this.status = 201;
    } catch (e) {
      this.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      yield next;
    }
  }

  * update(next) {
    try {
      yield Coiffeur
        .findByIdAndUpdate({ _id: this.params.id }, this.request.body).exec();
      this.status = 201;
    } catch (e) {
      this.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      yield next;
    }
  };

  * remove(next) {
    try {
      yield Coiffeur.findByIdAndRemove({ _id: this.params.id }).exec();
      this.status = 200;
    } catch (e) {
      this.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      yield next;
    }
  };
}

module.exports = new CoiffeurController();
