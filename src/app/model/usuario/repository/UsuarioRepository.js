const { Usuario, Pessoa } = require("../../../../../models");
var UsuarioRepository = function (app) {
  this.app = app;
  this.sequelize = new app.src.app.config.dbConnection();
  this.usuario = new app.src.app.model.usuario.entity.Usuario(this.sequelize);
  this.pessoaRepository = new app.src.app.model.pessoa.repository.PessoaRepository(
    app
  );
};

UsuarioRepository.prototype.findAll = async function (filter) {
  /* { raw: true } = Serve para exibir os dados sem a opção de inclusão, alteração ou exclusão */
  try {
    const result = await Usuario.findAll(
      { order: [["id", "ASC"]], include: [{ model: Pessoa, as: "Pessoa" }] },
      { raw: true }
    );
    return result;
  } finally {
  }
};

UsuarioRepository.prototype.findById = async function (id) {
  try {
    const result = await Usuario.findByPk(
      id,
      { include: [{ model: Pessoa, as: "Pessoa" }] },
      { raw: true }
    );
    return result;
  } catch (e) {
    throw e;
  }
};

UsuarioRepository.prototype.insert = async function (dados) {
  try {
    const result = await Pessoa.create({ nome: dados.login })
      .then((pessoa) => {
        dados.pesid = pessoa.id;
        return dados;
      })
      .then((usuario) => {
        Usuario.create(usuario).then((dado) => {
          return dado;
        });
      });
    return result;
  } catch (e) {
    throw e;
  }
};

UsuarioRepository.prototype.update = async function (dados) {
  try {
    const result = await Usuario.update(dados, {
      where: { id: dados.id },
    });
    let retorno;
    if (result[0] === 0) {
      retorno = JSON.stringify(null, null, 4);
    } else {
      retorno = await this.findById(dados.id);
    }
    //console.log(retorno);
    return retorno;
  } catch (e) {
    return new throws(e);
  } finally {
    this.sequelize.close();
  }
};

UsuarioRepository.prototype.delete = async function (id) {
  try {
    const result = await Usuario.destroy({ where: { id: id } });
    return result;
  } catch (e) {
    throw e;
  }
};

function retorno(app) {
  return new UsuarioRepository(app);
}

module.exports = function (app) {
  return retorno;
};
