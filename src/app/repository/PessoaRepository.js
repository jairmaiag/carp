const { Usuario, Pessoa } = require('../../../models')

var PessoaRepository = function (app) { }

PessoaRepository.prototype.findAll = async function (attributes, filter, order) {
  try {
    const result = await Pessoa.findAll({
      attributes: attributes,
      where: filter,
      limit: filter ? null : 10,
      order: order || [["id", "ASC"]],
      include: [{ model: Usuario, as: "Usuario" }],
      raw: true,
    })

    return result
  } catch (error) {
    throw error
  }
}

PessoaRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  try {
    page = await Pessoa.findAndPaginate(attributes, filter, order, page)

    return page
  } catch (error) {
    throw error
  }
}
PessoaRepository.prototype.findById = async function (id) {
  try {
    const result = await Pessoa.findByPk(id, {
      include: [{ model: Usuario, as: "Usuario" }],
    })

    return result
  } catch (error) {
    throw error
  }
}
PessoaRepository.prototype.findByUUId = async function (UUId) {
  try {
    const result = await Pessoa.findOne({
      where: { UUId: UUId },
      include: [{ model: Usuario, as: "Usuario" }],
    })

    return result
  } catch (error) {
    throw error
  }
}

PessoaRepository.prototype.insert = async function (dados) {
  try {
    const result = await Pessoa.create(dados)

    return result
  } catch (error) {
    throw error
  }
}

PessoaRepository.prototype.update = async function (dados) {
  try {
    const result = await Pessoa.update(dados, { where: { id: dados.id } })

    const retorno = result[0] === 1 ? 1 : null

    return retorno
  } catch (error) {
    throw error
  }
}

PessoaRepository.prototype.delete = async function (id) {
  try {
    const result = await Pessoa.destroy({
      where: { id: id },
    })

    return result
  } catch (error) {
    throw error
  }
}

function retorno(app) {
  return new PessoaRepository(app)
}

module.exports = () => retorno
