"use strict";
module.exports = (sequelize, DataTypes) => {
  const tabela = "pessoa";
  const campos = {
    id: {
      type: DataTypes.INTEGER,
      field: "pesid",
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      field: "pesnome",
      allowNull: false,
    },
    nomemeio: {
      type: DataTypes.STRING,
      field: "pesnomemeio",
    },
    sobrenome: {
      type: DataTypes.STRING,
      field: "pessobrenome",
    },
    nascimento: {
      type: DataTypes.DATE,
      field: "pesnascimento",
    },
    sexo: {
      type: DataTypes.STRING,
      field: "pessexo",
    },
    cpf: {
      type: DataTypes.STRING,
      field: "pescpf",
    },
    rg: {
      type: DataTypes.STRING,
      field: "pesrg",
    },
  };

  /* Definição de opções da entidade */
  const opcoes = {
    modelName: tabela,
    tableName: tabela,
    timestamps: false,
  };

  var Pessoa = sequelize.define("Pessoa", campos, opcoes);
  Pessoa.associate = function (models) {
    Pessoa.hasOne(models.Usuario, {
      as: "Usuario",
      foreignKey: "pesid",
      targetKey: "pesid",
      allowNull: true,
    });
  };
  return Pessoa;
};
