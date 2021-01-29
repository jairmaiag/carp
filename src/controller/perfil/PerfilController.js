const repository = require('../../db/repository/PerfilRepository')
const pessoaRepository = require('../../db/repository/PessoaRepository')
const { getUUIDV4 } = require('../../app/util/UUIDGenerator')
const { serverError, ok, notFound } = require('../../app/helpers/http/HttpHelpers')

class PerfilController {

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
      const entity = await repository.insert(req.body)
      return entity ? ok(entity) : notFound(req.i18n_texts.error_insert_record)
    } catch (error) {
      return serverError(error)
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

function retorno(app) {
  return new PerfilController(app)
}

module.exports = () => retorno
