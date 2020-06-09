const { Usuario, Pessoa } = require("../../../../../models");
var PessoaRepository = function (app) {
  this.app = app;
  this.sequelize = new app.src.app.config.dbConnection();
  this.pessoa = new app.src.app.model.pessoa.entity.Pessoa(this.sequelize);
  this.dados = [];
};

PessoaRepository.prototype.findAll = async function (filter) {
  /* { raw: true } = Serve para exibir os dados sem a opção de inclusão, alteração ou exclusão */
  try {
    const result = await Pessoa.findAll(
      { order: [["id", "ASC"]], include: [{ model: Usuario, as: "Usuario" }] },
      { raw: true }
    );
    return result;
  } catch (e) {
    throw e;
  }
};

PessoaRepository.prototype.findById = async function (id) {
  try {
    const result = await Pessoa.findByPk(id, {
      include: [{ model: Usuario, as: "Usuario" }],
    });
    return result;
  } catch (e) {
    throw e;
  }
};

PessoaRepository.prototype.insert = async function (dados) {
  try {
    const result = await Pessoa.create(dados);
    /*
    const result = await this.pessoa.create(dados);
    let retorno = JSON.stringify(result, null, 4);
    return retorno;
    */
    return result;
  } catch (e) {
    throw e;
  }
};

PessoaRepository.prototype.update = async function (dados) {
  try {
    const result = await Pessoa.update(dados, { where: { id: dados.id } });
    return result;
  } catch (e) {
    throw e;
  }
};

PessoaRepository.prototype.delete = async function (id) {
  try {
    const result = await Pessoa.destroy({ where: { id: id } });
    /*
    const result = await this.pessoa.destroy({ where: { id: id } });
    let retorno = JSON.stringify(result, null, 4);
    return retorno;
    */
    return result;
  } catch (e) {
    throw e;
  }
};

function retorno(app) {
  return new PessoaRepository(app);
}

module.exports = function (app) {
  return retorno;
};
