const repository = require('../../db/repository/PessoaRepository')
const { serverError, ok, notFound } = require('../../app/helpers/http/HttpHelpers')

class PessoaController {

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
    console.log(req);
    try {
      let parametros = req.query;
      let page = {};
      page.fieldName = parametros.fieldName || "id";
      page.previousId = parametros.previousId || 0;
      page.next = parametros.next || 0;
      page.size = parametros.size || 10;
      page.totalRows = parametros.totalRows || 0;
      page.total = parametros.total || 1;
      page.fieldOrder = parametros.fieldOrder || "id";
      page.directionOrder = parametros.directionOrder || "ASC";
      const entities = await repository.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, page)
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
  return new PessoaController(app)
}

module.exports = () => retorno
