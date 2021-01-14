'use strict'
const { parseMultipartData, sanitizeEntity } = require('strapi-utils')
const qs = require('qs')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findMax(ctx) {
    console.log(ctx.params)

    const listCourses = await strapi.services.course.find()
    const listCategories = await strapi.services.category.find({ level: 2 })

    let count = []

    listCategories.map((category) => {
      let temp = 0
      listCourses.map((course) => {
        course.categories.forEach((element) => {
          if (element.id === category.id) {
            temp += course.numRegister
          }
        })
      })
      count.push({
        numRegister: temp,
        category: category,
      })
    })

    // sort với hàm so sánh giảm dần
    count = count.sort(
      (a, b) => parseFloat(b.numRegister) - parseFloat(a.numRegister),
    )

    if (count.length < 6) {
      return count.map((item) => {
        item.category['numRegister'] = item.numRegister
        const category = sanitizeEntity(item.category, {
          model: strapi.models.category,
        })
        return category
      })
    }

    let res = [];
    for (var i = 0; i < 5; i++) {
      count[i].category['numRegister'] = count[i].numRegister
      const category = sanitizeEntity(item.category, {
        model: strapi.models.category,
      })
      res.push(category);
    }
    return res;
  },
}
