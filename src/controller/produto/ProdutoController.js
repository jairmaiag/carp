const repository = require('../../db/repository/ProdutoRepository')
const { serverError, ok, notFound, badRequest } = require('../../app/helpers/http/HttpHelpers')
const produtoValidador = require('./ProdutoValidadorFactory')

class ProdutoController {

  constructor(app) {
    this.app = app
  }

  async index(req) {
    try {
      const entities = await repository.findAll(req.body.attributes, req.body.filter, req.body.order)
      return entities.length > 0 ? ok(entities) : ok('Nenhum registro não encontrado.')
    } catch (error) {
      return serverError(error)
    }
  }

  async findAndPaginate(req) {
    try {
      const entities = await repository.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.body.page)
      return entities.rows.length > 0 ? ok(entities) : ok('Nenhum registro não encontrado.')
    } catch (error) {
      return serverError(error)
    }
  }

  async findByUUId(req) {
    try {
      const entity = await repository.findByUUId(req.params.UUId)
      return entity ? ok(entity) : ok('Registro não encontrado.')
    } catch (error) {
      return serverError(error)
    }
  }

  async findById(req) {
    try {
      const entity = await repository.findById(req.params.id)
      return entity ? ok(entity) : ok('Registro não encontrado.')
    } catch (error) {
      return serverError(error)
    }
  }

  async insert(req) {
    try {
      const dados = req.body

      const error = produtoValidador.valida(dados)
      if (error) {
        return badRequest(error)
      }

      const entity = await repository.insert(dados)
      return entity ? ok(entity) : notFound('Erro ao inserir o registro')
    } catch (error) {
      return serverError(error)
    }
  }

  async update(req) {
    try {
      const entity = await repository.update(req.body)
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
  return new ProdutoController(app)
}

module.exports = () => retorno
