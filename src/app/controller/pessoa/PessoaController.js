class PessoaController {
  constructor(app) {
    this.casoUso = new app.src.app.usecase.UcPessoa(app);
  }
  async index(filter) {
    return await this.casoUso.index(filter);
  }
  async findById(id) {
    return await this.casoUso.findById(id);
  }
  async insert(dados) {
    return await this.casoUso.insert(dados);
  }
  async update(dados) {
    return await this.casoUso.update(dados);
  }
  async delete(id) {
    return await this.casoUso.delete(id);
  }
}

function retorno(app) {
  return new PessoaController(app);
}

module.exports = function (app) {
  return retorno;
};
