'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Recurso', 
      {
        UUId: {
          field: 'UUIdRec',
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          comment: 'UUId na tabela, identificando registro para pesquisa externa.',
        },
        id: {
          field: 'idRec',
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          comment: 'Id na tabela, identificando registro único.',
        },
        nome: {
          field: 'nomeRec',
          allowNull: false,
          type: Sequelize.STRING(30),
          comment: "Nome do Recurso cadastrado.",
        },
        descricao: {
          field: 'descricaoRec',
          type: Sequelize.TEXT,
          comment: "Descrição do Recurso cadastrado.",
        },
        ativo: {
          field: 'ativoRec',
          allowNull: false,
          defaultValue: true,
          type: Sequelize.BOOLEAN,
          comment: 'Indica se o Recurso está ativa para ser utilizada.',
        },
        createdAt: {
          field: 'createAtRec',
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Data de criação do registro',
        },
        updatedAt: {
          field: 'updatedAtRec',
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Data de alteração do registro',
        },
      },
      {
        schema: 'carp', // default: public, PostgreSQL only.
        comment:
          'Tabela utilizada para armazenar os dados dos Recursos do sistema.',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recurso')
  },
};
