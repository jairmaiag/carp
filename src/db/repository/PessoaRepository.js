const { Usuario, Pessoa } = require('../models')
const includeUsuario = { association: 'Usuario', attributes:['id','UUId','login','expira','ativo'] }
const PessoaRepository = function () { }

PessoaRepository.prototype.findAll = async function (attributes, filter, order) {
  const result = await Pessoa.findAll({
    attributes: attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [["id", "ASC"]],
    include: includeUsuario,
    raw: true,
  })
  return result
}

PessoaRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  
  page = await Pessoa.findAndPaginate(attributes, filter, order, page)
  return page
}
PessoaRepository.prototype.findAndPaginateWithChildren = async function (attributes, filter, order, page) {
  page = await Pessoa.findAndPaginate(attributes, filter, order, page, includeUsuario)
  return page
}
PessoaRepository.prototype.findById = async function (id) {
  const result = await Pessoa.findByPk(id, {
    include: includeUsuario,
  })
  return result
}
PessoaRepository.prototype.findByUUId = async function (UUId) {
  const result = await Pessoa.findOne({
    where: { UUId: UUId },
    include: includeUsuario,
  })
  return result
}

PessoaRepository.prototype.insert = async function (dados) {
  return await Pessoa.create(dados);
}

PessoaRepository.prototype.update = async function (dados) {
  const result = await Pessoa.update(dados, { where: { UUId: dados.UUId } })
  return result[0] === 1 ? await this.findByUUId(dados.UUId) : null
}

PessoaRepository.prototype.delete = async function (UUId) {
  return await Pessoa.destroy({ where: { UUId: UUId } });
}

module.exports = new PessoaRepository()
