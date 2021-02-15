module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'RecursoPerfil',
    {
      PerfilId: {
        field: 'PerfilId',
        type: Sequelize.INTEGER,
        references: { model: 'Perfil', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Id na tabela de perfil.',
      },
      RecursoId: {
        field: 'RecursoId',
        type: Sequelize.INTEGER,
        references: { model: 'Recurso', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Id na tabela de recurso.',
      },
    },
    {
      schema: 'carp', // default: public, PostgreSQL only.
      comment:
        'Tabela utilizada para armazenar a ligação dos recursos com os perfis.',
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('RecursoPerfil'),
};
