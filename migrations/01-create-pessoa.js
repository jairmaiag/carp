"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "pessoa",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "pesid",
          primaryKey: true,
          autoIncrement: true,
          comment: "Id na tabela, identificando registro único.",
        },
        nome: {
          type: Sequelize.STRING(20),
          field: "pesnome",
          allowNull: false,
          comment: "Nome da pessoa cadastrada.",
        },
        nomemeio: {
          type: Sequelize.STRING(20),
          field: "pesnomemeio",
          comment: "Nome do meio da pessoa cadastrada.",
        },
        sobrenome: {
          type: Sequelize.STRING(20),
          field: "pessobrenome",
          comment: "Sobre Nome da pessoa cadastrada.",
        },
        nascimento: {
          type: Sequelize.DATE,
          field: "pesnascimento",
          comment: "Data de nascimento da pessoa cadastrada.",
        },
        sexo: {
          type: Sequelize.CHAR(1),
          defaultValue: "F",
          field: "pessexo",
          comment: "Sexo da pessoa cadastrada podendo assumir valores F ou M.",
        },
        cpf: {
          type: Sequelize.STRING(11),
          field: "pescpf",
          comment: "Número do CPF da pessoa cadastrada, somente números.",
        },
        rg: {
          type: Sequelize.STRING(9),
          field: "pesrg",
          comment: "Número do RG da pessoa cadastrada, somente números.",
        },
        ciracao: {
          type: Sequelize.DATEONLY,
          allowNull: true,
          field: "pescriacao",
          comment: "Data de criação da pessoa.",
        },
        inativo: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          field: "pesinativo",
          comment: "Indica se a pessoa está inativa para ser utilizada.",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        schema: "carp", // default: public, PostgreSQL only.
        comment:
          "Tabela utilizada para armazenar os dados de pessoas do sistema.", // comment for table
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("pessoa");
  },
};
