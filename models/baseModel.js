const { Model, Op } = require('sequelize')

class BaseModel extends Model {

  static async findAndPaginate(attributes, filter, order, page, include) {
    try {
      page.fieldName = page.fieldName || 'id'
      page.previousId = page.previousId || 0
      page.next = page.next || 0
      page.size = page.size || 10
      page.totalRows = page.totalRows || 0
      page.total = 1
      let offset = (page.next * page.size)
      order = order || [['id', 'ASC']]

      if (filter == null && page.next > 0 && page.totalRows > 0) {
        offset = 0
        if (order[0][1] == 'ASC') {
          filter = { [page.fieldName]: { [Op.gt]: [page.previousId] } }
        } else {
          filter = { [page.fieldName]: { [Op.lt]: [page.previousId] } }
        }
      }

      const totalRows = await super.count()

      const rows = await super.findAll({
        attributes: attributes, 
        where: filter,
        include: include,
        offset: offset,
        limit: page.size,
        order: order,
        raw: true
      })
  
      page.totalRows = totalRows
      if (page.totalRows > page.size) {
        page.total = Math.round(page.totalRows / page.size)
      }

      if (rows.length > 0) {
        page.previous = page.next
        page.next = page.next + 1
        page.previousId = rows[rows.length - 1][page.fieldName]
      }

      return { page, rows }
    } catch (error) {
      throw error
    }
  }
}

// BaseModel.init(
//   {},{
//   freezeTableName: true,
//   sequelize
// }
// )

module.exports = BaseModel


// sequelize = new Sequelize("postgres://carp:carp@localhost:5432/carp", {
//   define: {
//     freezeTableName: true,
//     timestamps: false,
//   },
// });
