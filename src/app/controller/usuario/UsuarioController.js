const UUIDGenerator = require('../../util/UUIDGenerator')

class UsuarioController {
  constructor(app) {
    this.app = app
    this.repository = new this.app.src.app.db.repository.UsuarioRepository(this.app)
  }

  async index (attributes, filter, order) {
    return await this.repository.findAll(attributes, filter, order)
  }
  
  async findAndPaginate (attributes, filter, order, page) {
    return await this.repository.findAndPaginate(attributes, filter, order, page)
  }

  async findByUUId (UUId) {
    return await this.repository.findByUUId(UUId)
  }

  async findById(id) {
    return await this.repository.findById(id)
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

    return await this.repository.insert(dados)
  }
  
  async update(dados) {
    return await this.repository.update(dados)
  }
  
  async delete(UUId) {
    return await this.repository.delete(UUId)
  }
}

function retorno(app) {
  return new UsuarioController(app)
}

module.exports = () => retorno
