const repository = require('../../db/repository/UsuarioRepository')
const InvalidParamError = require('../../app/errors/InvalidParamError')
const { getUUIDV4 } = require('../../app/util/UUIDGenerator')
const { serverError, ok, noContent, notFound, forbidden } = require('../../app/helpers/http/HttpHelpers')

class UsuarioController {

  constructor(app) {
    this.app = app
  }

  async index(req) {
    try {
      const entities = await repository.findAll(req.body.attributes, req.body.filter, req.body.order)
      return entities.length > 0 ? ok(entities) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async findAndPaginate(req) {
    try {
      const entities = await repository.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.body.page)
      return entities.rows.length > 0 ? ok(entities) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async findByUUId(req) {
    try {
      const entity = await repository.findByUUId(req.params.UUId)
      return entity ? ok(entity) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async findById(req) {
    try {
      const entity = await repository.findById(req.params.id)
      return entity ? ok(entity) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async insert(req) {
    try {
      const dados = req.body

      if (!dados.UUId) {
        dados.UUId = getUUIDV4()
      }

      const uuidPessoa = getUUIDV4()
      let nomePessoa = dados.login
      let sobrenomePessoa = null

      if (dados.Pessoa) {
        if (!dados.Pessoa.UUId) {
          dados.Pessoa.UUId = uuidPessoa
        }
        if (dados.Pessoa.nome) {
          nomePessoa = dados.Pessoa.nome
        }
        if (dados.Pessoa.sobrenome) {
          sobrenomePessoa = dados.Pessoa.sobrenome
        }
      } else {
        dados.Pessoa = {
          nome: nomePessoa,
          ativo: dados.ativo,
          sobrenome: sobrenomePessoa,
          UUId: uuidPessoa,
        }
      }

      const entity = await repository.insert(dados)
      return entity ? ok(entity) : notFound('Erro ao inserir o registro')
    } catch (error) {
      return serverError(error)
    }
  }

  async update(req) {
    try {
      const dados = req.body
      if (!dados.UUId) {
        return forbidden(new InvalidParamError('UUId é um campo obrigatório'))
      }

      const entity = await repository.update(dados)
      return entity ? ok(entity) : notFound('Registro não encontrado')
    } catch (error) {
      return serverError(error)
    }
  }

  async delete(req) {
    try {
      const quantidadeDeletada = await repository.delete(req.params.UUId)
      return quantidadeDeletada > 0 ? ok(quantidadeDeletada) : notFound('Registro não encontrado')
    } catch (error) {
      return serverError(error)
    }
  }
}

function retorno(app) {
  return new UsuarioController(app)
}

module.exports = () => retorno
