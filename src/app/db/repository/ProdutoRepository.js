const { Produto } = require('../models')

var ProdutoRepository = function (app) { }

ProdutoRepository.prototype.findAll = async function (attributes, filter, order) {
  try {
    const result = await Produto.findAll({
      attributes: attributes,
      where: filter,
      limit: filter ? null : 10,
      order: order || [['id', 'ASC']],
      raw: true
    })

    return result
  } catch (error) {
    throw error
  }
}

ProdutoRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  try {
    page = await Produto.findAndPaginate(attributes, filter, order, page)

    return page
  } catch (error) {
    throw error
  }
}

ProdutoRepository.prototype.findByUUId = async function (UUId) {
  try {
    const result = await Produto.findOne({
      where: { UUId: UUId }
    })

    return result
  } catch (error) {
    throw error
  }
}

ProdutoRepository.prototype.findById = async function (id) {
  try {
    const result = await Produto.findByPk(id)

    return result
  } catch (error) {
    throw error
  }
}

ProdutoRepository.prototype.insert = async function (dados) {
  try {
    const result = await Produto.create(dados)

    return result
  } catch (error) {
    throw error
  }
}

ProdutoRepository.prototype.update = async function (dados) {
  try {
    let retorno = null

    const result = await Produto.update(
      dados,
      { where: { UUId: dados.UUId } }
    )

    if (result[0] === 1) {
      retorno = await this.findByUUId(dados.UUId);
    }

    return retorno
  } catch (error) {
    throw error
  }
}

ProdutoRepository.prototype.delete = async function (UUId) {
  try {
    const result = await Produto.destroy({
      where: { UUId: UUId }
    })

    return result
  } catch (error) {
    throw error
  }
}

function retorno(app) {
  return new ProdutoRepository(app)
}

module.exports = () => retorno
