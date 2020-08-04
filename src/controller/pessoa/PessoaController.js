const UUIDGenerator = require('../../app/util/UUIDGenerator')
const http = require('../../app/helpers/http/http-helpers')
const InvalidParamError = require('../../app/errors/invalid-param-error')

class PessoaController {

  constructor(app) {
    this.app = app
    this.repository = new this.app.src.db.repository.PessoaRepository(this.app)
  }

  async index(req) {
    const entities =  await this.repository.findAll(req.body.attributes, req.body.filter, req.body.order)
    return entities.length > 0 ? http.ok(entities) : http.noContent()
  }

  async findAndPaginate(req) {
    const entities = await this.repository.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.body.page)
    return entities.rows.length > 0 ? http.ok(entities) : http.noContent()
  }

  async findByUUId(req) {
    const entity = await this.repository.findByUUId(req.params.UUId)
    return entity ? http.ok(entity) : http.noContent()
  }
  
  async findById(req) {
    const entity = await this.repository.findById(req.params.id)
    return entity ? http.ok(entity) : http.noContent()
  }

  async insert(req) {
    const dados = req.body
    if (!dados.UUId) {
      dados.UUId = UUIDGenerator.getUUIDV4()
    }

    const entity = await this.repository.insert(dados)
    return entity ? http.ok(entity) : http.notFound('Erro ao inserir o registro')
  }

  async update(req) {
    const dados = req.body
    if (!dados.id) {
      return http.forbidden(new InvalidParamError('ID é um campo obrigatório'))
    }

    const entity = await this.repository.update(dados)
    return entity ? http.ok(entity) : http.notFound('Registro não encontrado')
  }

  async delete(req) {
    const quantidadeDeletada = await this.repository.delete(req.params.id)
    return quantidadeDeletada > 0 ? http.ok(quantidadeDeletada) : http.notFound('Registro não encontrado')
  }
}

function retorno(app) {
  return new PessoaController(app)
}

module.exports = () => retorno
