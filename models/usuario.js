"use strict";
module.exports = (sequelize, DataTypes) => {
  const tabela = "usuario";
  const campos = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "usuid",
      comment: "Id na tabela, identificando registro único.",
    },
    login: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "usulogin",
      comment: "Login do usuáiro para acesso ao sistema.",
    },
    senha: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: "ususenha",
      comment: "Senha do usuáiro para acesso ao sistema.",
    },
    ciracao: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "usucriacao",
      comment: "Data de criação do usuáiro para acesso ao sistema.",
    },
    expira: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "usuexpirar",
      comment: "Data de expiração do usuáiro para acesso ao sistema.",
    },
    inativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "usuinativo",
      comment: "Indica se o usuáiro está inativo para acesso ao sistema.",
    },
    idPessoa: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "pesid",
      comment: "Id da tabela Pessoa, onde este usuário pertence.",
    },
  };
  /* Definição de opções da entidade (tabela) */
  const opcoes = {
    tableName: tabela,
    comment:
      "Tabela utilizada para armazenar os dados do usuário para acesso ao sistema.", // comment for table
  };

  const Usuario = sequelize.define("Usuario", campos, opcoes);
  Usuario.associate = function (models) {
    /* Usuário pertence a (belongsTo) Pessoa */
    Usuario.belongsTo(models.Pessoa, {
      as: "Pessoa",
      foreignKey: "pesid",
      allowNull: false,
    });
  };
  return Usuario;
};
