const UUIDGenerator = require('../util/UUIDGenerator')

class ProdutoUC {
  constructor(app) {
    this.app = app
    this.repository = null
  }

  criarRepository() {
    return (this.repository = new this.app.src.app.repository.ProdutoRepository(this.app))
  }

  async index(attributes, filter, order){
    this.repository = this.criarRepository()
    return await this.repository.findAll(attributes, filter, order)
  }

  async findAndPaginate(attributes, filter, order, page){
    this.repository = this.criarRepository()
    return await this.repository.findAndPaginate(attributes, filter, order, page)
  }

  async findByUUId(UUId) {
    this.repository = this.criarRepository()
    return await this.repository.findByUUId(UUId)
  }

  async findById(id) {
    this.repository = this.criarRepository()
    return await this.repository.findById(id)
  }

  async insert(dados) {
    if (!dados.UUId) {
      dados.UUId = UUIDGenerator.getUUIDV4()
    }
    this.repository = this.criarRepository()
    return await this.repository.insert(dados)
  }

  async update(dados) {
    this.repository = this.criarRepository()
    return await this.repository.update(dados)
  }

  async delete(UUId) {
    this.repository = this.criarRepository()
    return await this.repository.delete(UUId)
  }
}

function retorno(app) {
  return new ProdutoUC(app)
}

module.exports = () => retorno
