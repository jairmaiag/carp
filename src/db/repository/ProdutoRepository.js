const AbstractRepository = require('../abstract/AbstractRepository');
const { Produto } = require('../models')

var ProdutoRepository = function () { }

ProdutoRepository.prototype.findAll = async function (attributes, filter, order) {
  const result = await Produto.findAll({
    attributes: attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [['id', 'ASC']],
    raw: true
  })
  return result;
}

ProdutoRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  return Produto.findAndPaginate(attributes, filter, order, page);
}

ProdutoRepository.prototype.findByUUId = async function (UUId) {
  return Produto.findOne({ where: { UUId: UUId } });
}

ProdutoRepository.prototype.findById = async function (id) {
  return Produto.findByPk(id);
}

ProdutoRepository.prototype.insert = async function (dados) {
  try {
    return Produto.create(dados);
  } catch (error) {
    throw new Error(error.original);
  }
}

ProdutoRepository.prototype.update = async function (dados) {
  let retorno = null
  const result = await Produto.update(dados, { where: { UUId: dados.UUId } })
  if (result[0] === 1) {
    retorno = await this.findByUUId(dados.UUId);
  }
  return retorno;
}

ProdutoRepository.prototype.delete = async function (UUId) {
  return Produto.destroy({ where: { UUId: UUId } });
}

module.exports = new ProdutoRepository()
