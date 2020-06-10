"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "usuario",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          field: "usuid",
          comment: "Id na tabela, identificando registro único.",
        },
        login: {
          type: Sequelize.STRING(30),
          allowNull: false,
          field: "usulogin",
          comment: "Login do usuáiro para acesso ao sistema.",
        },
        senha: {
          type: Sequelize.STRING(64),
          allowNull: false,
          field: "ususenha",
          comment: "Senha do usuáiro para acesso ao sistema.",
        },
        ciracao: {
          type: Sequelize.DATEONLY,
          allowNull: true,
          field: "usucriacao",
          comment: "Data de criação do usuáiro para acesso ao sistema.",
        },
        expira: {
          type: Sequelize.DATEONLY,
          allowNull: true,
          field: "usuexpirar",
          comment: "Data de expiração do usuáiro para acesso ao sistema.",
        },
        inativo: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          field: "usuinativo",
          comment: "Indica se o usuáiro está inativo para acesso ao sistema.",
        },
        idPessoa: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: "pesid",
          comment: "Id da tabela Pessoa, onde este usuário pertence.",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          comment: "Data de criação do registro",
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          comment: "Data de alteração do registro",
        },
      },
      {
        schema: "carp", // default: public, PostgreSQL only.
        comment:
          "Tabela utilizada para armazenar os dados do usuário para acesso ao sistema.", // comment for table
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("usuario");
  },
};
