const { getUUIDV4 } = require('../../app/util/UUIDGenerator')
const { serverError, ok, noContent, notFound, forbidden, badRequest } = require('../../app/helpers/http/HttpHelpers')
const produtoValidador = require('./ProdutoValidadorFactory')
const InvalidParamError = require('../../app/errors/InvalidParamError')

class ProdutoController {

  constructor(app) {
    this.app = app
    this.repository = new this.app.src.db.repository.ProdutoRepository()
  }

  async index(req) {
    try {
      const entities = await this.repository.findAll(req.body.attributes, req.body.filter, req.body.order)
      return entities.length > 0 ? ok(entities) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async findAndPaginate(req) {
    try {
      const entities = await this.repository.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.body.page)
      return entities.rows.length > 0 ? ok(entities) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async findByUUId(req) {
    try {
      const entity = await this.repository.findByUUId(req.params.UUId)
      return entity ? ok(entity) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async findById(req) {
    try {
      const entity = await this.repository.findById(req.params.id)
      return entity ? ok(entity) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async insert(req) {
    try {
      const error = produtoValidador.valida(req.body)
      if (error) {
        return badRequest(error)
      }

      const dados = req.body
      if (!dados.UUId) {
        dados.UUId = getUUIDV4()
      }

      const entity = await this.repository.insert(dados)
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

      const entity = await this.repository.update(dados)
      return entity ? ok(entity) : notFound('Registro não encontrado')
    } catch (error) {
      return serverError(error)
    }
  }

  async delete(req) {
    try {
      const quantidadeDeletada = await this.repository.delete(req.params.UUId)
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
