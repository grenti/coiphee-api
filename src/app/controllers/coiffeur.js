const Coiffeur = require('../models/coiffeur')
const Logger = require('bunyan')
const log = new Logger({ name: 'CoiffeurController' })
const config = require('../../config')
const PageLinkFactory = require('./pageLinkFactory')

/**
 * Controller providing handlers for Coiffeur routes
 *
 * @class {CoiffeurController}
 * @type {CoiffeurController}
 */
class CoiffeurController {
  static async gets(ctx, next) {
    try {
      let { page, rows } = ctx.request.query
      page = parseInt(page || 1)
      rows = parseInt(rows || 25)

      const coiffeurs = await Coiffeur.find({})
        .skip((page * rows) - rows)
        .limit(page * rows).exec()
      const totalRecords = await Coiffeur.count()

      const meta = { route: 'coiffeurs', data: coiffeurs, page, rows, count: totalRecords }
      const { data, links, header } = PageLinkFactory.build(meta)

      // TODO: display links for related entities in links, like for shoppes,
      // TODO: show links for coiffeurs and services

      ctx.body = totalRecords ? { data, links } : []
      ctx.set('X-Total-Count', totalRecords)
      if (totalRecords) {
        ctx.set('Link', header.link)
      }
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
      const coiffeur = await Coiffeur.findOne({ _id: ctx.params.id }).exec()
      if (coiffeur) {
        ctx.status = 200
        ctx.body = coiffeur
      } else {
        ctx.status = 404
      }
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
      const { id } = ctx.params
      if (id) {
        const coiffeur = await Coiffeur
          .findByIdAndUpdate({ _id: id }, ctx.request.body).exec()
        ctx.status = coiffeur ? 200 : 404
        ctx.body = coiffeur ? {} : {errors: [{message: 'Not Found'}]}
        ctx.status = 200
      } else {
        ctx.status = 422
        ctx.body = { errors: [{ message: 'Bad Request' }] }
      }
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
      const { id } = ctx.params
      if (id) {
        await Coiffeur.findByIdAndRemove({ _id: id }).exec()
        ctx.status = 200
      } else {
        ctx.status = 422
        ctx.body = { errors: [{message: 'Bad Request'}] }
      }
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
