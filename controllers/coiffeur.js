
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
  static async getAll(ctx, next) {
    try {
      ctx.body = await Coiffeur.find({}).exec();
    } catch (e) {
      ctx.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      await next();
    }
  }

  static async get(next) {
    try {
      ctx.body = await Coiffeur.find({ _id: ctx.params.id }).exec();
    } catch (e) {
      ctx.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      await next();
    }
  }

  static async create(next) {
    try {
      var newCoiffeur = new Coiffeur(ctx.request.body);
      ctx.body = await newCoiffeur.save();
      ctx.status = 201;
    } catch (e) {
      ctx.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      await next();
    }
  }

  static async update(next) {
    try {
      await Coiffeur
        .findByIdAndUpdate({ _id: ctx.params.id }, ctx.request.body).exec();
      ctx.status = 201;
    } catch (e) {
      ctx.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      await next();
    }
  };

  static async remove(next) {
    try {
      await Coiffeur.findByIdAndRemove({ _id: ctx.params.id }).exec();
      ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      console.error(e);
      log.error(e);
    } finally {
      await next();
    }
  };
}

module.exports = CoiffeurController;
