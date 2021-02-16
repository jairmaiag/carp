const { Pessoa } = require('../models');

const includeUsuario = { association: 'Usuario', attributes: ['id', 'UUId', 'login', 'expira', 'ativo'] };

class PessoaRepository {

  static async findAll(attributes, filter, order) {
    const limitObj = filter ? null : 10;
    const orderObj = order || [['id', 'ASC']];
    return Pessoa.findAll({
      attributes, where: filter, limit: limitObj, order: orderObj, include: includeUsuario, raw: true,
    });
  }

  static async findAndPaginate(attributes, filter, order, page) {
    return Pessoa.findAndPaginate(attributes, filter, order, page);
  }

  static async findAndPaginateWithChildren(attributes, filter, order, page) {
    return Pessoa.findAndPaginate(attributes, filter, order, page, includeUsuario);
  }

  static async findById(id) {
    return Pessoa.findByPk(id, { include: includeUsuario });
  }

  static async findByUUId(UUId) {
    return Pessoa.findOne({ where: { UUId }, include: includeUsuario });
  }

  static async insert(dados) {
    try {
      return Pessoa.create(dados);
    } catch (error) {
      throw new Error(error.original);
    }
  }

  static async update(dados) {
    const result = await Pessoa.update(dados, { where: { UUId: dados.UUId } });
    return result[0] === 1 ? this.findByUUId(dados.UUId) : null;
  }

  static async delete(UUId) {
    return Pessoa.destroy({ where: { UUId } });
  }
}

module.exports = () => PessoaRepository;
