'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Usuario', 
      {
        UUId: {
          field: 'UUIdUsu',
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          comment: 'UUId na tabela, identificando registro para pesquisa externa.',
        },
        id: {
          field: 'idUsu',
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          comment: 'Id na tabela, identificando registro único.',
        },
        login: {
          field: 'loginUsu',
          allowNull: false,
          type: Sequelize.STRING(30),
          comment: 'Login do usuáiro para acesso ao sistema.',
        },
        senha: {
          field: 'senhaUsu',
          allowNull: false,
          type: Sequelize.STRING(128),
          comment: 'Senha do usuáiro para acesso ao sistema.',
        },
        expira: {
          field: 'expirarUsu',
          allowNull: true,
          type: Sequelize.DATEONLY,
          comment: 'Data de expiração do usuáiro para acesso ao sistema.',
        },
        ativo: {
          field: 'ativoUsu',
          allowNull: false,
          defaultValue: true,
          type: Sequelize.BOOLEAN,
          comment: 'Indica se o usuáiro está ativo para acesso ao sistema.',
        },
        idPessoa: {
          field: 'idPes',
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'Pessoa', key: 'idPes' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          comment: 'Id da tabela Pessoa, onde este usuário pertence.',
        },
        // idPerfil: {
        //   field: 'idPer',
        //   allowNull: false,
        //   type: Sequelize.INTEGER,
        //   comment: 'Id da tabela Perfil, onde este usuário pertence.',
        // },
        createdAt: {
          field: 'createAtUsu',
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Data de criação do registro',
        },
        updatedAt: {
          field: 'updatedAtUsu',
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Data de alteração do registro',
        },
      },
      {
        schema: 'carp', // default: public, PostgreSQL only.
        comment:
          'Tabela utilizada para armazenar os dados do usuário para acesso ao sistema.',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usuario');
  },
}
