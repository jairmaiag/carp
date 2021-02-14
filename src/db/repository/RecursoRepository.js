const { Recurso } = require('../models');

const include = { association: 'Perfis', through: { attributes: [] } };

class RecursoRepository {
  static async findAll(attributes, filter, order) {
    const result = await Recurso.findAll({
      attributes,
      where: filter,
      limit: filter ? null : 10,
      order: order || [['id', 'ASC']],
      raw: true,
    });
    return result;
  }

  static async findAndPaginate(attributes, filter, order, page) {
    const result = await Recurso.findAndPaginate(
      attributes,
      filter,
      order,
      page,
    );
    return result;
  }

  static async findById(id) {
    return Recurso.findByPk(id);
  }

  static async findByUUId(UUId) {
    return Recurso.findOne({
      where: {
        UUId,
      },
      include,
    });
  }

  static async insert(dados) {
    return Recurso.create(dados);
  }

  static async update(dados) {
    const result = await Recurso.update(dados, {
      where: {
        UUId: dados.UUId,
      },
    });
    return result[0] === 1 ? this.findByUUId(dados.UUId) : null;
  }

  static async delete(UUId) {
    return Recurso.destroy({
      where: {
        UUId,
      },
    });
  }
}

module.exports = function repository() { return RecursoRepository; };
