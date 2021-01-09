'use strict'
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async index(ctx) {
    return await strapi.plugins['email'].services.email.send({
        to: 'mtbinhitus@gmail.com',
        from: 'group06onlineacademy@gmail.com',
        subject: 'Use strapi email provider successfully',
        text: 'Hello world!',
        html: 'Hello world!',
      });
  },
  async findCourseByInstructor(ctx) {
    console.log(ctx.params.id);
    return await strapi.services.course.find({
      id: ctx.params.id,
      'instructorId.id': ctx.state.user.id,
    });
  }
}
