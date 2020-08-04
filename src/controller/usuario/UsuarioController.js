const UUIDGenerator = require('../../app/util/UUIDGenerator')
const http = require('../../app/helpers/http/http-helpers')
const InvalidParamError = require('../../app/errors/invalid-param-error')

class UsuarioController {

  constructor(app) {
    this.app = app
    this.repository = new this.app.src.db.repository.UsuarioRepository(this.app)
  }

  async index (req) {
    const entities =  await this.repository.findAll(req.body.attributes, req.body.filter, req.body.order)
    return entities.length > 0 ? http.ok(entities) : http.noContent()
  }
  
  async findAndPaginate (req) {
    const entities = await this.repository.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.body.page)
    return entities.rows.length > 0 ? http.ok(entities) : http.noContent()
  }

  async findByUUId (req) {
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

    const uuidPessoa = UUIDGenerator.getUUIDV4()
    let nomePessoa = dados.login
    let sobrenomePessoa = null

    if (dados.Pessoa) {
      if (!dados.Pessoa.UUId) {
        dados.Pessoa.UUId = uuidPessoa
      }
      if (dados.Pessoa.nome) {
        nomePessoa = dados.Pessoa.nome
      }
      if (dados.Pessoa.sobrenome) {
        sobrenomePessoa = dados.Pessoa.sobrenome
      }
    } else {
      dados.Pessoa = {
        nome: nomePessoa,
        ativo: dados.ativo,
        sobrenome: sobrenomePessoa,
        UUId: uuidPessoa,
      }
    }

    const entity = await this.repository.insert(dados)
    return entity ? http.ok(entity) : http.notFound('Erro ao inserir o registro')
  }
  
  async update(req) {
    const dados = req.body
    if (!dados.UUId) {
      return http.forbidden(new InvalidParamError('UUId é um campo obrigatório'))
    }

    const entity = await this.repository.update(dados)
    return entity ? http.ok(entity) : http.notFound('Registro não encontrado')
  }
  
  async delete(req) {
    const quantidadeDeletada = await this.repository.delete(req.params.UUId)
    return quantidadeDeletada > 0 ? http.ok(quantidadeDeletada) : http.notFound('Registro não encontrado')
  }
}

function retorno(app) {
  return new UsuarioController(app)
}

module.exports = () => retorno
