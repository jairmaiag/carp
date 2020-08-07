const repository = require('../../db/repository/ProdutoRepository')
const { getUUIDV4 } = require('../../app/util/UUIDGenerator')
const { serverError, ok, noContent, notFound, forbidden, badRequest } = require('../../app/helpers/http/HttpHelpers')
const produtoValidador = require('./ProdutoValidadorFactory')
const InvalidParamError = require('../../app/errors/InvalidParamError')
const util = require('../../app/util/Util')
const validator = require('validator')

class ProdutoController {

  constructor(app) {
    this.app = app
  }

  async index(req) {
    try {
      if (util.isEmpty(req.body.filter)  ) {
        return forbidden(new InvalidParamError('É necessário filtrar a consulta.'))
      }

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
      if (!validator.isUUID(req.params.UUId, 4)  ) {
        return forbidden(new InvalidParamError('Formato inválido para o campo UUId.'))
      }

      const entity = await repository.findByUUId(req.params.UUId)
      return entity ? ok(entity) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async findById(req) {
    try {
      if (!validator.isInt(req.params.id)) {
        return forbidden(new InvalidParamError('O campo Id deve ser do tipo numérico.'))
      }

      const entity = await repository.findById(req.params.id)
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

      const entity = await repository.insert(dados)
      return entity ? ok(entity) : notFound('Erro ao inserir o registro')
    } catch (error) {
      return serverError(error)
    }
  }

  async update(req) {
    try {
      const dados = req.body
      if (util.isEmpty(dados.UUId)  ) {
        return forbidden(new InvalidParamError('UUId é um campo obrigatório'))
      }

      if (!validator.isUUID(dados.UUId, 4)  ) {
        return forbidden(new InvalidParamError('Formato inválido para o campo UUId.'))
      }

      const entity = await repository.update(dados)
      return entity ? ok(entity) : notFound('Registro não encontrado')
    } catch (error) {
      return serverError(error)
    }
  }

  async delete(req) {
    try {
      if (!validator.isUUID(req.params.UUId, 4)  ) {
        return forbidden(new InvalidParamError('Formato inválido para o campo UUId.'))
      }

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
