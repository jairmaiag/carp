const UUIDGenerator = require('../../util/UUIDGenerator')

class PessoaController {

  constructor(app) {
    this.app = app
    this.repository = new this.app.src.app.db.repository.PessoaRepository(this.app)
  }

  async index(attributes, filter, order) {
    return await this.repository.findAll(attributes, filter, order)
  }

  async findAndPaginate(attributes, filter, order, page) {
    return await this.repository.findAndPaginate(attributes, filter, order, page)
  }

  async findById(id) {
    return await this.repository.findById(id)
  }

  async findByUUId(UUId) {
    return await this.repository.findByUUId(UUId)
  }

  async insert(dados) {
    if (!dados.UUId) {
      dados.UUId = UUIDGenerator.getUUIDV4()
    }
    return await this.repository.insert(dados)
  }

  async update(dados) {
    return await this.repository.update(dados)
  }

  async delete(id) {
    return await this.repository.delete(id)
  }
}

function retorno(app) {
  return new PessoaController(app)
}

module.exports = () => retorno
