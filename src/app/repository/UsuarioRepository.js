const { Usuario, Pessoa } = require("../../../models")
const { PessoaRepository } = require("./PessoaRepository")

var UsuarioRepository = function (app) { }

UsuarioRepository.prototype.findAll = async function (attributes, filter, order) {
  try {
    const result = await Usuario.findAll({
      attributes: attributes,
      where: filter,
      limit: filter ? null : 10,
      order: order || [["id", "ASC"]],
      include: [{ model: Pessoa, as: "Pessoa" }],
      raw: true,
    })

    return result
  } catch (error) {
    throw error
  }
}

UsuarioRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  try {
    const include = [{ model: Pessoa, as: "Pessoa" }]
    page = await Usuario.findAndPaginate(
      attributes,
      filter,
      order,
      page,
      include
    )

    return page
  } catch (error) {
    throw error
  }
}

UsuarioRepository.prototype.findByUUId = async function (UUId) {
  try {
    const result = await Usuario.findOne({
      where: { UUId: UUId },
      include: [{ model: Pessoa, as: "Pessoa" }],
    })

    return result
  } catch (error) {
    throw error
  }
}

UsuarioRepository.prototype.findById = async function (id) {
  try {
    const result = await Usuario.findByPk(id, {
      include: [{ model: Pessoa, as: "Pessoa" }],
    })

    return result
  } catch (error) {
    throw error
  }
}

UsuarioRepository.prototype.insert = async function (dados) {
  try {
    const pessoa = await Pessoa.create(dados.Pessoa)
    dados.idPessoa = pessoa.id
    const result = await Usuario.create(dados)

    return result
  } catch (error) {
    throw error
  }
}

UsuarioRepository.prototype.update = async function (dados) {
  try {
    let retorno = null
    if (dados.Pessoa) {
      PessoaRepository.update(dados.Pessoa)
    }
    const result = await Usuario.update(dados, { where: { UUId: dados.UUId } })
    if (result[0] === 1) {
      retorno = await this.findByUUId(dados.UUId)
    }

    return retorno
  } catch (error) {
    throw error
  }
}

UsuarioRepository.prototype.delete = async function (UUId) {
  try {
    const result = await Usuario.destroy({
      where: { UUId: UUId },
    })

    return result
  } catch (error) {
    throw error
  }
}

UsuarioRepository.prototype.findByLoginSenha = async function (filter) {
  try {
    const result = await Usuario.findOne(
      {
        where: {
          login: filter.login,
          senha: filter.senha,
        },
      },
      { raw: true }
    )
    return result
  } catch (error) {
    throw error
  }
}

function retorno(app) {
  return new UsuarioRepository(app)
}

module.exports = () => retorno
