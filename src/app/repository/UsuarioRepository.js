const { Usuario, Pessoa } = require("../../../models");

var UsuarioRepository = function (app) {};

UsuarioRepository.prototype.findAll = async function (
  attributes,
  filter,
  order
) {
  try {
    const result = await Usuario.findAll({
      attributes: attributes,
      where: filter,
      limit: filter ? null : 10,
      order: order || [["id", "ASC"]],
      include: [{ model: Pessoa, as: "Pessoa" }],
      raw: true,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

UsuarioRepository.prototype.findAndPaginate = async function (
  attributes,
  filter,
  order,
  page
) {
  try {
    const include = [{ model: Pessoa, as: "Pessoa" }];
    page = await Usuario.findAndPaginate(
      attributes,
      filter,
      order,
      page,
      include
    );

    return page;
  } catch (error) {
    throw error;
  }
};

UsuarioRepository.prototype.findByUUId = async function (UUId) {
  try {
    const result = await Usuario.findOne({
      where: { UUId: UUId },
      include: [{ model: Pessoa, as: "Pessoa" }],
    });

    return result;
  } catch (error) {
    throw error;
  }
};

UsuarioRepository.prototype.findById = async function (id) {
  try {
    const result = await Usuario.findByPk(id, {
      include: [{ model: Pessoa, as: "Pessoa" }],
    });

    return result;
  } catch (error) {
    throw error;
  }
};

UsuarioRepository.prototype.insert = async function (dados) {
  try {
    nomePessoa = dados.login;
    sobrenomePessoa = null;
    if (dados.Pessoa) {
      if (dados.Pessoa.nome) {
        nomePessoa = dados.Pessoa.nome;
      }
      if (dados.Pessoa.sobrenome) {
        sobrenomePessoa = dados.Pessoa.sobrenome;
      }
    }

    const dadosPessoa = {
      nome: nomePessoa,
      ativo: dados.ativo,
      sobrenome: sobrenomePessoa,
    };
    const pessoa = await Pessoa.create(dadosPessoa);
    dados.idPessoa = pessoa.id;
    const result = await Usuario.create(dados);

    return result;
  } catch (error) {
    throw error;
  }
};

UsuarioRepository.prototype.update = async function (dados) {
  try {
    let retorno = null;

    const result = await Usuario.update(dados, { where: { UUId: dados.UUId } });

    if (result[0] === 1) {
      retorno = await this.findByUUId(dados.UUId);
    }

    return retorno;
  } catch (error) {
    throw error;
  }
};

UsuarioRepository.prototype.delete = async function (UUId) {
  try {
    const result = await Usuario.destroy({
      where: { UUId: UUId },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

UsuarioRepository.prototype.findByLoginSenha = async function (filter) {
  try {
    const result = await Usuario.findOne(
      {
        where: {
          login: filter.login,
          senha: filter.senha,
        },
      },
      { raw: true }
    );
    return result;
  } catch (e) {
    throw e;
  }
};

function retorno(app) {
  return new UsuarioRepository(app);
}

module.exports = () => retorno;
