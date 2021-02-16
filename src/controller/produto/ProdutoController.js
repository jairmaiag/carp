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
      return entities.length > 0 ? ok(entities) : ok(req.i18n_texts.empty_table)
    } catch (error) {
      return serverError(error)
    }
  }

  async findAndPaginate(req) {
    try {
      const entities = await repository.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.body.page)
      return entities.rows.length > 0 ? ok(entities) : ok(req.i18n_texts.empty_table)
    } catch (error) {
      return serverError(error)
    }
  }

  async findByUUId(req) {
    try {
      const entity = await repository.findByUUId(req.params.UUId)
      return entity ? ok(entity) : ok(req.i18n_texts.record_not_found)
    } catch (error) {
      return serverError(error)
    }
  }

  async findById(req) {
    try {
      const entity = await repository.findById(req.params.id)
      return entity ? ok(entity) : ok(req.i18n_texts.record_not_found)
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
      return entity ? ok(entity) : notFound(req.i18n_texts.error_insert_record)
    } catch (error) {
      if (error.stack.includes("violates unique constraint")) {
        error.stack = req.i18n_texts.record_already_exists;
      }
      return this.serverError(error);
    }
  }

  async update(req) {
    try {
      const entity = await repository.update(req.body)
      return entity ? ok(entity) : notFound(req.i18n_texts.record_not_found)
    } catch (error) {
      return serverError(error)
    }
  }

  async delete(req) {
    try {
      const quantidadeDeletada = await repository.delete(req.params.UUId)
      return quantidadeDeletada > 0 ? ok(quantidadeDeletada) : notFound(req.i18n_texts.record_not_found)
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = () => ProdutoController;
