'use strict'
const { parseMultipartData, sanitizeEntity } = require('strapi-utils')
const qs = require('qs')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      data.userId = ctx.state.user.id
      entity = await strapi.services['wish-list'].create(data, { files })
    } else {
      ctx.request.body.userId = ctx.state.user.id
      entity = await strapi.services['wish-list'].create(ctx.request.body)
    }
    return sanitizeEntity(entity, { model: strapi.models['wish-list'] })
  },
  async update(ctx) {
    const { id } = ctx.params

    let entity

    const [withList] = await strapi.services['wish-list'].find({
      id: ctx.params.id,
      'userId.id': ctx.state.user.id,
    })

    if (!withList) {
      return ctx.unauthorized(`You can't update this entry`)
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services['wish-list'].update({ id }, data, {
        files,
      })
    } else {
      entity = await strapi.services['wish-list'].update(
        { id },
        ctx.request.body,
      )
    }

    return sanitizeEntity(entity, { model: strapi.models['wish-list'] })
  },
  async delete(ctx) {
    const { id } = ctx.params

    const [withList] = await strapi.services['wish-list'].find({
      id: ctx.params.id,
      'userId.id': ctx.state.user.id,
    })

    if (!withList) {
      return ctx.unauthorized(`You can't update this entry`)
    }

    const entity = await strapi.services['wish-list'].delete({ id })
    return sanitizeEntity(entity, { model: strapi.models['wish-list'] })
  },
}
