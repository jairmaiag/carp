class PessoaUC {
  constructor(app) {
    this.app = app;
    this.repository = null;
  }

  criarRepository() {
    return (this.repository = new this.app.src.app.repository.PessoaRepository(this.app));
  }

  async index(attributes, filter, order) {
    this.repository = this.criarRepository();
    return await this.repository.findAll(attributes, filter, order);
  }

  async findAndPaginate(attributes, filter, order, page) {
    this.repository = this.criarRepository();
    return await this.repository.findAndPaginate(
      attributes,
      filter,
      order,
      page
    );
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
  return new PessoaUC(app);
}

module.exports = () => retorno;
