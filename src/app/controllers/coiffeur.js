const Coiffeur = require('../models/coiffeur')
const Logger = require('bunyan')
const log = new Logger({ name: 'CoiffeurController' })
const config = require('../../config')

/**
 * Controller providing handlers for Coiffeur routes
 *
 * @class
 * @type {CoiffeurController}
 */
class CoiffeurController {
  static async getAll(ctx, next) {
    try {
      let { page, offset } = ctx.request.query
      // const { offset } = ctx.request.query
      page = parseInt(page || 1)
      offset = parseInt(offset || 10)

      log.info('Page: ', page)
      log.info('Offset: ', offset)
      log.info('QueryString: ', ctx.request.query)

      const coiffeurs = await Coiffeur.find({})
        .skip(page > 0 ? ((page - 1) * offset) : 0)
        .limit(page).exec()
      const totalRecords = await Coiffeur.count()

      const result = {
        data: coiffeurs,
        links: {
          first: `/coiffeurs?page=1&offset=${offset}`,
          previous: `/coiffeurs?page=${page - 1}&offset=${offset}`,
          next: `/coiffeurs?page=${page + 1}&offset=${offset}`,
          last: `/coiffeurs?page=${Math.ceil(totalRecords / offset)}&offset=${offset}`
        }
      }

      ctx.body = result
      ctx.set('X-Total-Count', totalRecords)
      ctx.set('Link', `<http://localhost:${config.port}/coiffeurs?offset=25&limit=25>; rel="next"`)
    } catch (e) {
      ctx.status = 500
      console.error(e)
      log.error(e)
    } finally {
      await next()
    }
  }

  static async get(ctx, next) {
    try {
      const coiffeur = await Coiffeur.find({ _id: ctx.params.id }).exec()
      ctx.status = !coiffeur ? 404 : 200
      ctx.body = coiffeur
    } catch (e) {
      ctx.status = 500
      console.error(e)
      log.error(e)
    } finally {
      await next()
    }
  }

  static async create(ctx, next) {
    try {
      var newCoiffeur = new Coiffeur(ctx.request.body)
      ctx.body = await newCoiffeur.save()
      ctx.status = 201
    } catch (e) {
      ctx.status = 500
      console.error(e)
      log.error(e)
    } finally {
      await next()
    }
  }

  static async update(ctx, next) {
    try {
      await Coiffeur
        .findByIdAndUpdate({ _id: ctx.params.id }, ctx.request.body).exec()
      ctx.status = 201
    } catch (e) {
      ctx.status = 500
      console.error(e)
      log.error(e)
    } finally {
      await next()
    }
  }

  static async remove(ctx, next) {
    try {
      await Coiffeur.findByIdAndRemove({ _id: ctx.params.id }).exec()
      ctx.status = 200
    } catch (e) {
      ctx.status = 500
      console.error(e)
      log.error(e)
    } finally {
      await next()
    }
  }
}

module.exports = CoiffeurController
