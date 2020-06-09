class UcPessoa {
  constructor(app) {
    this.app = app;
    this.repository = null;
  }
  criarRepository() {
    return (this.repository = new this.app.src.app.model.pessoa.repository.PessoaRepository(
      this.app
    ));
  }
  async index(filter) {
    this.repository = this.criarRepository();
    return await this.repository.findAll(filter);
  }
  async findById(id) {
    this.repository = this.criarRepository();
    return await this.repository.findById(id);
  }
  async insert(dados) {
    this.repository = this.criarRepository();
    return await this.repository.insert(dados);
  }
  async update(dados) {
    this.repository = this.criarRepository();
    return await this.repository.update(dados);
  }
  async delete(id) {
    this.repository = this.criarRepository();
    return await this.repository.delete(id);
  }
}

function retorno(app) {
  return new UcPessoa(app);
}

module.exports = function () {
  return retorno;
};
