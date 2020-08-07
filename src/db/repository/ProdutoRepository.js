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

  return result
}

ProdutoRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  page = await Produto.findAndPaginate(attributes, filter, order, page)

  return page
}

ProdutoRepository.prototype.findByUUId = async function (UUId) {
  const result = await Produto.findOne({
    where: { UUId: UUId }
  })

  return result
}

ProdutoRepository.prototype.findById = async function (id) {
  const result = await Produto.findByPk(id)

  return result
}

ProdutoRepository.prototype.insert = async function (dados) {
  const result = await Produto.create(dados)

  return result
}

ProdutoRepository.prototype.update = async function (dados) {
  let retorno = null

  const result = await Produto.update(
    dados,
    { where: { UUId: dados.UUId } }
  )

  if (result[0] === 1) {
    retorno = await this.findByUUId(dados.UUId);
  }

  return retorno
}

ProdutoRepository.prototype.delete = async function (UUId) {
  const result = await Produto.destroy({
    where: { UUId: UUId }
  })

  return result
}

module.exports = new ProdutoRepository()
