const User = require('../models/user')
const Logger = require('bunyan')
const log = new Logger({ name: 'UserController' })
const PageLinkFactory = require('./pageLinkFactory')
const { HTTP_HEADERS } = require('../constants/constants')

class UserController {
  static async gets(ctx, next) {
    try {
      let { page, rows } = ctx.request.query
      page = parseInt(page || 1)
      rows = parseInt(rows || 25)

      const promiseReturns = await Promise.all([
        User.find({})
          .skip((page * rows) - rows)
          .limit(page * rows)
          .exec(),
        User.count()
      ])

      const meta = { route: 'users', data: promiseReturns[0], page, rows, count: promiseReturns[1] }
      const { data, links, header } = PageLinkFactory.build(meta)

      ctx.body = promiseReturns[1] ? { data, links } : []
      ctx.set(HTTP_HEADERS.totalCount, promiseReturns[1])
      if (promiseReturns[1]) {
        ctx.set(HTTP_HEADERS.link, header.link)
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
      const user = await User.findOne({ _id: ctx.params.id }).exec()
      if (user) {
        ctx.status = 200
        ctx.body = user
      } else {
        ctx.status = 404
      }
    } catch (e) {
      ctx.status = 500
      console.error(e)
      log.error(e)
    } finally {
      await next
    }
  }

  static async create(ctx, next) {
    try {
      let newUser = new User(ctx.request.body)
      ctx.body = await newUser.save()
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
        const user = await User.findByIdAndUpdate({ _id: id }, ctx.request.body).exec()
        ctx.status = user ? 200 : 404
        ctx.body = user ? {} : { errors: [{ message: 'Not found' }] }
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
        const removed = await User.findByIdAndRemove({ _id: id }).exec()
        ctx.status = removed ? 204 : 404
      } else {
        ctx.status = 422
        ctx.body = {errors: [{message: 'Bad Request'}]}
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

module.exports = exports = UserController
