const { Pessoa } = require('../models');

const includeUsuario = { association: 'Usuario', attributes: ['id', 'UUId', 'login', 'expira', 'ativo'] };

class PessoaRepository {
  static async findAll(attributes, filter, order) {
    const result = await Pessoa.findAll({
      attributes,
      where: filter,
      limit: filter ? null : 10,
      order: order || [['id', 'ASC']],
      include: includeUsuario,
      raw: true,
    });
    return result;
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
    return Pessoa.create(dados);
  }

  static async update(dados) {
    const result = Pessoa.update(dados, { where: { UUId: dados.UUId } });
    return result[0] === 1 ? this.findByUUId(dados.UUId) : null;
  }

  static async delete(UUId) {
    return Pessoa.destroy({ where: { UUId } });
  }
}

module.exports = () => PessoaRepository;
