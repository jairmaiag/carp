class PessoaController {
  constructor(app) {
    this.casoUso = new app.src.app.usecase.PessoaUC(app)
  }

  async index (attributes, filter, order) {
    return await this.casoUso.index(attributes, filter, order)
  }

  async findAndPaginate (attributes, filter, order, page) {
    return await this.casoUso.findAndPaginate(attributes, filter, order, page)
  }

  async findById(id) {
    return await this.casoUso.findById(id)
  }

  async insert(dados) {
    return await this.casoUso.insert(dados)
  }

  async update(dados) {
    return await this.casoUso.update(dados)
  }
  
  async delete(id) {
    return await this.casoUso.delete(id)
  }
}

function retorno(app) {
  return new PessoaController(app)
}

module.exports = () => retorno
