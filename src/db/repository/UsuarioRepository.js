const { Usuario, Pessoa } = require("../models")
const criptor = require('../../app/util/Cryptography');
const { getUUIDV4 } = require('../../app/util/UUIDGenerator')
const pessoaRepository = require('./PessoaRepository')
const includePessoa = { association: 'Pessoa', attributes: ['id', 'UUId', 'nome', 'nomemeio', 'sobrenome', 'nascimento', 'sexo', 'cpf', 'rg', 'ativo'] }
const attributesExcludes = { exclude: ['idPessoa', 'idPes', 'senha'] }
const UsuarioRepository = function () { }

UsuarioRepository.prototype.findAll = async function (attributes, filter, order) {
  if (!attributes) {
    attributes: { exclude: ['senha'] }
  }
  let include = { association: 'Pessoa' }
  const result = await Usuario.findAll({
    attributes: attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [["id", "ASC"]],
    include,
    raw: true,
  })

  return result
}

UsuarioRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  if (!attributes) {
    attributes = attributesExcludes
  }
  return await Usuario.findAndPaginate(attributes, filter, order, page, includePessoa)
}

UsuarioRepository.prototype.findByUUId = async function (UUId) {
  const result = await Usuario.findOne({
    where: { UUId: UUId },
    attributes: attributesExcludes,
    include: includePessoa,
  })

  return result
}

UsuarioRepository.prototype.findById = async function (id) {
  const result = await Usuario.findByPk(id, {
    attributes: attributesExcludes,
    include: includePessoa,
  })

  return result
}
UsuarioRepository.prototype.dadosPessoa = async function (dados) {
  let pessoa = null;
  if (dados.idPessoa) {
    pessoa = await pessoaRepository.findById(dados.idPessoa);
  }
  if (!pessoa) {
    const uuid = getUUIDV4();
    if (!dados.Pessoa) {
      pessoa = await pessoaRepository.insert({ nome: dados.login, UUId: uuid, ativo: true })
    } else {
      dados.Pessoa.UUId = dados.Pessoa.UUId || uuid;
      dados.Pessoa.nomemeio = dados.Pessoa.nomemeio || null;
      dados.Pessoa.sobrenome = dados.Pessoa.sobrenome || null
      dados.Pessoa.sexo = dados.Pessoa.sexo || 'F'
      dados.Pessoa.nascimento = dados.Pessoa.nascimento || null;
      dados.Pessoa.ativo = dados.Pessoa.ativo || true;
      pessoa = await pessoaRepository.insert(dados.Pessoa);
    }
  }
  return pessoa;
}

UsuarioRepository.prototype.insert = async function (dados) {
  try {
    dados.Pessoa = await this.dadosPessoa(dados);
    dados.idPessoa = dados.Pessoa.id;
    dados.ativo = dados.ativo || true;
    dados.senha = criptor.cryptor(dados.senha.trim());
    const result = await Usuario.create(dados);
    result.Pessoa = dados.Pessoa;
    const complete = await this.findById(result.id);
    return complete;
  } catch (error) {
    throw new Error(error.original);
  }
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
  filter.senha = criptor.cryptor(filter.senha.trim());
  const result = await Usuario.findOne(
    {
      attributes: attributesExcludes,
      where: {
        login: filter.login,
        senha: filter.senha,
      },
      include: includePessoa
    },
    { raw: true }
  )
  return result
}

module.exports = new UsuarioRepository()
