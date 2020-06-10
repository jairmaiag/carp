"use strict";
module.exports = (sequelize, DataTypes) => {
  const tabela = "pessoa";
  const campos = {
    id: {
      type: DataTypes.INTEGER,
      field: "pesid",
      primaryKey: true,
      autoIncrement: true,
      comment: "Id na tabela, identificando registro único.",
    },
    nome: {
      type: DataTypes.STRING(20),
      field: "pesnome",
      allowNull: false,
      comment: "Nome da pessoa cadastrada.",
    },
    nomemeio: {
      type: DataTypes.STRING(20),
      field: "pesnomemeio",
      comment: "Nome do meio da pessoa cadastrada.",
    },
    sobrenome: {
      type: DataTypes.STRING(20),
      field: "pessobrenome",
      comment: "Sobre Nome da pessoa cadastrada.",
    },
    nascimento: {
      type: DataTypes.DATE,
      field: "pesnascimento",
      comment: "Data de nascimento da pessoa cadastrada.",
    },
    sexo: {
      type: DataTypes.STRING,
      field: "pessexo",
      comment: "Sexo da pessoa cadastrada podendo assumir valores F ou M.",
    },
    cpf: {
      type: DataTypes.STRING(11),
      field: "pescpf",
      comment: "Número do CPF da pessoa cadastrada, somente números.",
    },
    rg: {
      type: DataTypes.STRING(9),
      field: "pesrg",
      comment: "Número do RG da pessoa cadastrada, somente números.",
    },
    ciracao: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "pescriacao",
      comment: "Data de criação da pessoa.",
    },
    inativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "pesinativo",
      comment: "Indica se a pessoa está inativa para ser utilizada.",
    },
  };

  /* Definição de opções da entidade */
  const opcoes = {
    tableName: tabela,
    comment: "Tabela utilziada para armazenar os dados de uma pessoa.", // comment for table
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
