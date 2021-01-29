const { Perfil, Usuario, Pessoa } = require("../models")
const { getUUIDV4 } = require('../../app/util/UUIDGenerator')
const pessoaRepository = require('./PessoaRepository')

const PerfilRepository = function () { }

PerfilRepository.prototype.findAll = async function (attributes, filter, order) {
  const result = await Peril.findAll({
    attributes: attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [["id", "ASC"]],
    include: [{ model: Usuario, as: "Usuario" }],
    raw: true,
  })

  return result
}

PerfilRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  const include = [{ model: Usuario, as: "Usuario" }]
  page = await Peril.findAndPaginate(
    attributes,
    filter,
    order,
    page,
    include
  )
  return page
}

PerfilRepository.prototype.findByUUId = async function (UUId) {
  const result = await Peril.findOne({
    where: { UUId: UUId },
    include: [{ model: Usuario, as: "Usuario" }],
  })

  return result
}

PerfilRepository.prototype.findById = async function (id) {
  const result = await Peril.findByPk(id, {
    include: [{ model: Usuario, as: "Usuario" }],
  })

  return result
}
PerfilRepository.prototype.dadosPessoa = async function(dados){
  let pessoa;
  if(dados.idPessoa){
    pessoa = await pessoaRepository.findById(dados.idPessoa);
  }else{
    const uuid = getUUIDV4();
    if(!dados.Pessoa){
      pessoa = await pessoaRepository.insert({nome: dados.login, UUId: uuid,ativo: true })
    }else {
      dados.Pessoa.UUId = dados.Pessoa.UUId || uuid;
      dados.Pessoa.ativo = dados.Pessoa.ativo || true;
      pessoa = await pessoaRepository.insert(dados.Pessoa);
    }
  }
  return pessoa;
}

PerfilRepository.prototype.insert = async function (dados) {
  const result = await Peril.create(dados);
  return result;
}

PerfilRepository.prototype.update = async function (dados) {
  const result = await Peril.update(dados, { where: { UUId: dados.UUId } })
  if (result[0] === 1) {
    retorno = await this.findByUUId(dados.UUId)
  }

  return retorno
}

PerfilRepository.prototype.delete = async function (UUId) {
  const result = await Peril.destroy({
    where: { UUId: UUId },
  })

  return result
}

module.exports = new PerfilRepository()
