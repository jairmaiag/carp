'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Perfil', 
      {
        UUId: {
          field: 'UUIdPer',
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        id: {
          field: 'idPer',
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        nome: {
          field: 'nomePer',
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        descricao: {
          field: 'descricaoPer',
          type: Sequelize.TEXT,
        },
        ativo: {
          field: 'ativoPer',
          allowNull: false,
          defaultValue: true,
          type: DataTypes.BOOLEAN,
          comment: 'Indica se o perfil está ativa para ser utilizada.',
        },
        createdAt: {
          field: 'createAtPer',
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          field: 'updatedAtPer',
          allowNull: false,
          type: Sequelize.DATE
        },
      },
      {
        schema: 'carp', // default: public, PostgreSQL only.
        comment:'Tabela utilizada para armazenar os dados do Perfil.',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Perfil')
  }
}
