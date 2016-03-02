
const Coiffeur = require('../models/coiffeur');
const Logger = require('bunyan');
const log = new Logger({name: 'CoiffeurController'});

/**
 * Coiffeur Controller for Coiffeur routes
 *
 * @class
 * @type {CoiffeurController}
 */
var CoiffeurController = function() {};

CoiffeurController.prototype.getAll = function *(next) {
  try {
    this.body = yield Coiffeur.find({}).exec();
  } catch (e) {
    this.status = 500;
    console.error(e);
    log.error(e);
  } finally {
    yield next;
  }
};

CoiffeurController.prototype.get = function *(next) {
  try {
    this.body = yield Coiffeur.find({_id: this.params.id}).exec();
  } catch (e) {
    this.status = 500;
    console.error(e);
    log.error(e);
  } finally {
    yield next;
  }
};

CoiffeurController.prototype.create = function *(next) {
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
};

CoiffeurController.prototype.update = function *(next) {
  try {
    yield Coiffeur
      .findByIdAndUpdate({_id: this.params.id}, this.request.body).exec();
    this.status = 201;
  } catch (e) {
    this.status = 500;
    console.error(e);
    log.error(e);
  } finally {
    yield next;
  }
};

CoiffeurController.prototype.remove = function *(next) {
  try {
    yield Coiffeur.findByIdAndRemove({_id: this.params.id}).exec();
    this.status = 200;
  } catch (e) {
    this.status = 500;
    console.error(e);
    log.error(e);
  } finally {
    yield next;
  }
};

module.exports = new CoiffeurController();
