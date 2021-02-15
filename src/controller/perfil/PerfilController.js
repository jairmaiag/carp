const repository = require('../../db/repository/PerfilRepository')();
const { serverError, ok, notFound } = require('../../app/helpers/http/HttpHelpers');

class PerfilController {
  constructor(app) {
    this.app = app;
    this.serverError = serverError;
  }

  async index(req) {
    try {
      const { att, filter, order } = req.body;
      const entities = await repository.findAll(att, filter, order);
      return entities.length > 0 ? ok(entities) : ok(req.i18n_texts.empty_table);
    } catch (error) {
      return this.serverError(error);
    }
  }

  async findAndPaginate(req) {
    try {
      const {
        att, filter, order, page,
      } = req.body;
      const entities = await repository.findAndPaginate(att, filter, order, page);
      return entities.rows.length > 0 ? ok(entities) : ok(req.i18n_texts.empty_table);
    } catch (error) {
      return this.serverError(error);
    }
  }

  async findByUUId(req) {
    try {
      const entity = await repository.findByUUId(req.params.UUId);
      return entity ? ok(entity) : ok(req.i18n_texts.record_not_found);
    } catch (error) {
      return this.serverError(error);
    }
  }

  async findById(req) {
    try {
      const entity = await repository.findById(req.params.id);
      return entity ? ok(entity) : ok(req.i18n_texts.record_not_found);
    } catch (error) {
      return this.serverError(error);
    }
  }

  async insert(req) {
    try {
      const entity = await repository.insert(req.body);
      return entity ? ok(entity) : notFound(req.i18n_texts.error_insert_record);
    } catch (error) {
      return this.serverError(error);
    }
  }

  async update(req) {
    try {
      const entity = await repository.update(req.body);
      return entity ? ok(entity) : notFound(req.i18n_texts.record_not_found);
    } catch (error) {
      return this.serverError(error);
    }
  }

  async delete(req) {
    try {
      const quantidadeDeletada = await repository.delete(req.params.UUId);
      if (quantidadeDeletada > 0) {
        return ok(quantidadeDeletada);
      }
      return notFound(req.i18n_texts.record_not_found);
    } catch (error) {
      return this.serverError(error);
    }
  }
}
function retorno(app) {
  return new PerfilController(app);
}

module.exports = () => retorno;
