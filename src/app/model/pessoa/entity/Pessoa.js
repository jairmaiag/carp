const Sequelize = require("sequelize");
const tabela = "pessoa";
var campos = {
  id: {
    type: Sequelize.INTEGER,
    field: "pesid",
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    field: "pesnome",
    allowNull: false,
  },
  nomemeio: {
    type: Sequelize.STRING,
    field: "pesnomemeio",
  },
  sobrenome: {
    type: Sequelize.STRING,
    field: "pessobrenome",
  },
  nascimento: {
    type: Sequelize.DATE,
    field: "pesnascimento",
  },
  sexo: {
    type: Sequelize.STRING,
    field: "pessexo",
  },
  cpf: {
    type: Sequelize.STRING,
    field: "pescpf",
  },
  rg: {
    type: Sequelize.STRING,
    field: "pesrg",
  },
};

/* Definição de opções da entidade */
var opcoes = {
  modelName: tabela,
  tableName: tabela,
};

class Pessoa extends Sequelize.Model {
  constructor(campos, opcoes) {
    super(campos, opcoes);
  }
}

function retorno(sequelize) {
  return sequelize.define(tabela, campos);
}

module.exports = function () {
  return retorno;
};
