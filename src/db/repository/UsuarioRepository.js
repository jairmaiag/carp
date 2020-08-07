const { Usuario, Pessoa } = require("../models")
const { PessoaRepository } = require("./PessoaRepository")

var UsuarioRepository = function () { }

UsuarioRepository.prototype.findAll = async function (attributes, filter, order) {
  const result = await Usuario.findAll({
    attributes: attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [["id", "ASC"]],
    include: [{ model: Pessoa, as: "Pessoa" }],
    raw: true,
  })

  return result
}

UsuarioRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  const include = [{ model: Pessoa, as: "Pessoa" }]
  page = await Usuario.findAndPaginate(
    attributes,
    filter,
    order,
    page,
    include
  )

  return page
}

UsuarioRepository.prototype.findByUUId = async function (UUId) {
  const result = await Usuario.findOne({
    where: { UUId: UUId },
    include: [{ model: Pessoa, as: "Pessoa" }],
  })

  return result
}

UsuarioRepository.prototype.findById = async function (id) {
  const result = await Usuario.findByPk(id, {
    include: [{ model: Pessoa, as: "Pessoa" }],
  })

  return result
}

UsuarioRepository.prototype.insert = async function (dados) {
  const pessoa = await Pessoa.create(dados.Pessoa)
  dados.idPessoa = pessoa.id
  const result = await Usuario.create(dados)

  return result
}

UsuarioRepository.prototype.update = async function (dados) {
  let retorno = null
  if (dados.Pessoa) {
    PessoaRepository.update(dados.Pessoa)
  }
  const result = await Usuario.update(dados, { where: { UUId: dados.UUId } })
  if (result[0] === 1) {
    retorno = await this.findByUUId(dados.UUId)
  }

  return retorno
}

UsuarioRepository.prototype.delete = async function (UUId) {
  const result = await Usuario.destroy({
    where: { UUId: UUId },
  })

  return result
}

UsuarioRepository.prototype.findByLoginSenha = async function (filter) {
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
}

module.exports = new UsuarioRepository()
