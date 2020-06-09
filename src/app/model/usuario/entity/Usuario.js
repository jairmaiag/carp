const Sequelize = require("sequelize");
const tabela = "usuario";
var campos = {
  id: {
    type: Sequelize.INTEGER,
    field: "usuid",
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: Sequelize.STRING,
    field: "usulogin",
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    field: "ususenha",
    allowNull: false,
  },
  idPessoa: {
    type: Sequelize.INTEGER,
    field: "pesid",
    /*
    references:{
      model: Pessoa,
      key:"pesid",
    },
    */
  },
};

/* Definição de opções da entidade */
var opcoes = {
  modelName: tabela,
  tableName: tabela,
};

class Usuario extends Sequelize.Model {
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
