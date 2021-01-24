const { Model, Op } = require("sequelize");

class BaseModel extends Model {
  static async findAndPaginate(attributes, filter, order, page, include) {
    try {
      if (page === undefined) {
        page = {};
      }
      /* Preciso fazer os testes para as páginas posteriores e anteriores */
      page.fieldName = page.fieldName || "id";
      page.previousRecord = page.previousRecord || 0;
      page.lastRecord = page.lastRecord || 0;
      page.nextPage = page.nextPage || 0;
      page.amountRecord = page.amountRecord || 10;
      page.totalRows = page.totalRows || 0;
      page.totalPages = page.totalPages || 1;
      page.currentPage = page.currentPage || 1
      page.directionOrder = page.directionOrder || "ASC";
      let offset = page.nextPage * page.amountRecord;
      order = [[page.fieldName, page.directionOrder]];
      
      if(typeof page.nextPage === 'string'){
        page.nextPage = parseInt(page.nextPage);
      }

      if (filter == undefined && page.nextPage > 0 && page.totalRows > 0) {
        offset = 0;
        if (directionOrder === "ASC") {
          filter = { [page.fieldName]: { [Op.gt]: [page.lastRecord] } };
        } else {
          filter = { [page.fieldName]: { [Op.lt]: [page.previousRecord] } };
        }
      }

      page.totalRows = await super.count();

      const rows = await super.findAll({
        attributes: attributes,
        where: filter,
        include: include,
        offset: offset,
        limit: page.amountRecord,
        order: order,
        raw: true,
      });

      if (page.totalRows > page.amountRecord) {
        let resto = page.totalRows % page.amountRecord;
        page.totalPages = Math.round(page.totalRows / page.amountRecord);
        if (resto != 0 && resto <= 5) {
          page.totalPages++;
        }
      }

      if (rows.length > 0 && page.totalRows > page.amountRecord) {
        page.previous = page.nextPage;
        if(rows.length <= page.totalRows){
          page.nextPage = page.nextPage + 1;
        }
        if(page.nextPage > 1){
          page.previousRecord = rows[rows.length - 1][page.fieldName];
        }
        page.lastRecord = rows[rows.length - 1][page.fieldName]
      }

      return { page, rows, order };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseModel;
