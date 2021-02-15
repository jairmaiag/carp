// const { RepositoryBase } = require('./RepositoryBase');
const { Recurso } = require('../models');

const include = { association: 'Perfis', through: { attributes: [] } };

class RecursoRepository {

  static async findAll(attributes, filter, order) {
    const limitObj = filter ? null : 10;
    const orderObj = order || [['id', 'ASC']];
    return Recurso.findAll({ attributes, where: filter, limit: limitObj, order: orderObj, raw: true, });
  }

  static async findAndPaginate(attributes, filter, order, page) {
    return Recurso.findAndPaginate(attributes, filter, order, page,);
  }

  static async findById(id) {
    return Recurso.findByPk(id);
  }

  static async findByUUId(UUId) {
    return Recurso.findOne({ where: { UUId, }, include, });
  }

  static async insert(dados) {
    try {
      return await Recurso.create(dados)
    } catch (error) {
      throw new Error(error.original);
    }
  }

  static async update(dados) {
    const result = await Recurso.update(dados, { where: { UUId: dados.UUId, }, });
    return result[0] === 1 ? this.findByUUId(dados.UUId) : null;
  }

  static async delete(UUId) {
    return Recurso.destroy({ where: { UUId, }, });
  }
}

module.exports = () => RecursoRepository;
