const UUIDGenerator = require("../util/UUIDGenerator");

class UsuarioUC {
  constructor(app) {
    this.app = app;
    this.repository = null;
  }

  criarRepository() {
    return (this.repository = new this.app.src.app.repository.UsuarioRepository(
      this.app
    ));
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

  async findByUUId(UUId) {
    this.repository = this.criarRepository();
    return await this.repository.findByUUId(UUId);
  }

  async findById(id) {
    this.repository = this.criarRepository();
    return await this.repository.findById(id);
  }

  async insert(dados) {
    if (!dados.UUId) {
      dados.UUId = UUIDGenerator.getUUIDV4();
    }
    let nomePessoa = dados.login;
    let sobrenomePessoa = null;
    let uuidPessoa = UUIDGenerator.getUUIDV4();

    if (dados.Pessoa) {
      if (!dados.Pessoa.UUId) {
        dados.Pessoa.UUId = uuidPessoa;
      }
      if (dados.Pessoa.nome) {
        nomePessoa = dados.Pessoa.nome;
      }
      if (dados.Pessoa.sobrenome) {
        sobrenomePessoa = dados.Pessoa.sobrenome;
      }
    } else {
      dados.Pessoa = {
        nome: nomePessoa,
        ativo: dados.ativo,
        sobrenome: sobrenomePessoa,
        UUId: uuidPessoa,
      };
    }

    this.repository = this.criarRepository();
    return await this.repository.insert(dados);
  }

  async update(dados) {
    this.repository = this.criarRepository();
    return await this.repository.update(dados);
  }

  async delete(UUId) {
    this.repository = this.criarRepository();
    return await this.repository.delete(UUId);
  }
}

function retorno(app) {
  return new UsuarioUC(app);
}

module.exports = () => retorno;
