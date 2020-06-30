class ProdutoController {
  constructor(app) {
    this.casoUso = new app.src.app.usecase.ProdutoUC(app)
  }

  async index (attributes, filter, order) {
    return await this.casoUso.index(attributes, filter, order)
  }

  async findAndPaginate (attributes, filter, order, page) {
    return await this.casoUso.findAndPaginate(attributes, filter, order, page)
  }
  
  async findByUUId (UUId) {
    return await this.casoUso.findByUUId(UUId)
  }

  async findById(id) {
    return await this.casoUso.findById(id)
  }

  async insert (dados) {
    return await this.casoUso.insert(dados)
  }

  async update (dados) {
    return await this.casoUso.update(dados)
  }

  async delete (UUId) {
    return await this.casoUso.delete(UUId)
  }
}

function retorno(app) {
  return new ProdutoController(app)
}

module.exports = () => retorno
