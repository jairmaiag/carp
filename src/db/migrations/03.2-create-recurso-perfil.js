'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'RecursoPerfil', 
      {
        PerfilId: {
          field: 'PerfilId',
          type: Sequelize.INTEGER,
          references: { model: 'Perfil', key: 'idPer' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          comment: 'Id na tabela de perfil.',
        },
        RecursoId: {
            field: 'RecursoId',
            type: Sequelize.INTEGER,
            references: { model: 'Recurso', key: 'idRec' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            comment: 'Id na tabela de recurso.',
        }
      },
      {
        schema: 'carp', // default: public, PostgreSQL only.
        comment:
          'Tabela utilizada para armazenar a ligação dos recursos com os perfis.',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RecursoPerfil')
  },
};
