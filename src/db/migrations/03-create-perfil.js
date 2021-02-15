module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'Perfil',
    {
      UUId: {
        field: 'UUIdPer',
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        comment: 'UUId na tabela, identificando registro para pesquisa externa.',
      },
      id: {
        // field: 'idPer',
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        comment: 'Id na tabela, identificando registro único.',
      },
      nome: {
        field: 'nomePer',
        allowNull: false,
        type: Sequelize.STRING(30),
        comment: 'Nome do perfil cadastrado.',
      },
      descricao: {
        field: 'descricaoPer',
        type: Sequelize.TEXT,
        comment: 'Descrição do perfil cadastrado.',
      },
      ativo: {
        field: 'ativoPer',
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
        comment: 'Indica se o perfil está ativa para ser utilizada.',
      },
      createdAt: {
        field: 'createAtPer',
        allowNull: false,
        type: Sequelize.DATE,
        comment: 'Data de criação do registro',
      },
      updatedAt: {
        field: 'updatedAtPer',
        allowNull: false,
        type: Sequelize.DATE,
        comment: 'Data de alteração do registro',
      },
    },
    {
      schema: 'carp', // default: public, PostgreSQL only.
      comment:
        'Tabela utilizada para armazenar os dados do Perfil.',
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Perfil'),
};
