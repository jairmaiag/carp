const PessoaRepository = require('../../db/repository/PessoaRepository')();
const { serverError, ok, notFound } = require('../../app/helpers/http/HttpHelpers');

class PessoaController {

  constructor(app) {
    this.app = app;
  }

  async index(req) {
    try {
      const entities = await PessoaRepository.findAll(req.body.attributes, req.body.filter, req.body.order);
      return entities.length > 0 ? ok(entities) : ok(req.i18n_texts.empty_table);
    } catch (error) {
      return serverError(error);
    }
  }

  async findAndPaginate(req) {
    try {
      const entities = await PessoaRepository.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.query)
      return entities.rows.length > 0 ? ok(entities) : ok(req.i18n_texts.empty_table)
    } catch (error) {
      return serverError(error)
    }
  }

  async findByUUId(req) {
    try {
      const entity = await PessoaRepository.findByUUId(req.params.UUId)
      return entity ? ok(entity) : ok(req.i18n_texts.record_not_found)
    } catch (error) {
      return serverError(error)
    }
  }

  async findById(req) {
    try {
      const entity = await PessoaRepository.findById(req.params.id)
      return entity ? ok(entity) : ok(req.i18n_texts.record_not_found)
    } catch (error) {
      return serverError(error)
    }
  }

  async insert(req) {
    try {
      const entity = await PessoaRepository.insert(req.body)
      return entity ? ok(entity) : notFound(req.i18n_texts.error_insert_record)
    } catch (error) {
      if (error.stack.includes("violates unique constraint")) {
        error.stack = req.i18n_texts.record_already_exists;
      }
      return serverError(error)
    }
  }

  async update(req) {
    try {
      const entity = await PessoaRepository.update(req.body)
      return entity ? ok(entity) : notFound(req.i18n_texts.record_not_found)
    } catch (error) {
      return serverError(error)
    }
  }

  async delete(req) {
    try {
      const quantidadeDeletada = await PessoaRepository.delete(req.params.UUId)
      return quantidadeDeletada > 0 ? ok(quantidadeDeletada) : notFound(req.i18n_texts.record_not_found)
    } catch (error) {
      return serverError(error)
    }
  }
}

function retorno(app) {
  return new PessoaController(app);
}

module.exports = () => retorno;
