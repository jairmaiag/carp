'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'RecrusoPerfil', 
      {
        idPerfil: {
          field: 'idPer',
          type: Sequelize.INTEGER,
          references: { model: 'Perfil', key: 'idPer' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          comment: 'Id na tabela de perfil.',
        },
        idRecurso: {
            field: 'idRec',
            type: Sequelize.INTEGER,
            references: { model: 'Recurso', key: 'idRec' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            comment: 'Id na tabela de recurso.',
        },  
        createdAt: {
          field: 'createAtRecPer',
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Data de criação do registro',
        },
        updatedAt: {
          field: 'updatedAtRecPer',
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Data de alteração do registro',
        },
      },
      {
        schema: 'carp', // default: public, PostgreSQL only.
        comment:
          'Tabela utilizada para armazenar a ligação dos recursos com os perfis.',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RecrusoPerfil')
  },
};
