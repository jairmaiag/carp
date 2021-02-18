const repository = require('../../db/repository/UsuarioRepository')
const { serverError, ok, notFound } = require('../../app/helpers/http/HttpHelpers')

class UsuarioController {

  constructor(app) {
    this.app = app
  }

  async index(req) {
    try {
      const { attributes, filter, order } = req.body;
      const entities = await repository.findAll(attributes, filter, order);
      return entities.length > 0 ? ok(entities) : ok(req.i18n_texts.empty_table);
    } catch (error) {
      return serverError(error)
    }
  }

  async findAndPaginate(req) {
    try {
      const { attributes, filter, order, page } = req.body;
      const entities = await repository.findAndPaginate(attributes, filter, order, page);
      return entities.rows.length > 0 ? ok(entities) : ok(req.i18n_texts.empty_table);
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

module.exports = () => UsuarioController;
