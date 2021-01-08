'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          data.author = ctx.state.user.id;
          entity = await strapi.services.wish-list.create(data, { files });
        } else {
          ctx.request.body.author = ctx.state.user.id;
          entity = await strapi.services.wish-list.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.wish-list });
      },
};
