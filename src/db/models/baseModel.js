const { Model, Op } = require("sequelize");

class BaseModel extends Model {
  static async findAndPaginate(attributes, filter, order, page, include) {
    try {
      if (page === undefined) {
        page = {};
      }

      page.fieldName = page.fieldName || "id";
      page.previousId = page.previousId || 0;
      page.next = page.next || 0;
      page.size = page.size || 10;
      page.totalRows = page.totalRows || 0;
      page.total = 1;
      page.fieldOrder = page.fieldOrder || "id";
      page.directionOrder = page.directionOrder || "ASC";
      let offset = page.next * page.size;
      order = order || [[page.fieldOrder, page.directionOrder]];

      if (filter == undefined && page.next > 0 && page.totalRows > 0) {
        offset = 0;
        if (order[0][1] == "ASC") {
          filter = { [page.fieldName]: { [Op.gt]: [page.previousId] } };
        } else {
          filter = { [page.fieldName]: { [Op.lt]: [page.previousId] } };
        }
      }

      page.totalRows = await super.count();

      const rows = await super.findAll({
        attributes: attributes,
        where: filter,
        include: include,
        offset: offset,
        limit: page.size,
        order: order,
        raw: true,
      });

      if (page.totalRows > page.size) {
        let resto = page.totalRows % page.size;
        page.total = Math.round(page.totalRows / page.size);
        if (resto != 0 && resto <= 5) {
          page.total++;
        }
      }

      if (rows.length > 0) {
        page.previous = page.next;
        page.next = page.next + 1;
        page.previousId = rows[rows.length - 1][page.fieldName];
      }

      return { page, rows, order };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseModel;
