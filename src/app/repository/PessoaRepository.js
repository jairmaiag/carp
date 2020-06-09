const { Usuario, Pessoa } = require("../../../models");
var PessoaRepository = function (app) {};

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
