'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Pessoa', 
      {
        id: {
          field: 'idPes',
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          comment: 'Id na tabela, identificando registro único.',
        },
        nome: {
          field: 'nomePes',
          allowNull: false,
          type: Sequelize.STRING(20),
          comment: 'Nome da pessoa cadastrada.',
        },
        nomeMeio: {
          field: 'nomeMeioPes',
          type: Sequelize.STRING(20),
          comment: 'Nome do meio da pessoa cadastrada.',
        },
        sobrenome: {
          field: 'sobrenomePes',
          type: Sequelize.STRING(20),
          comment: 'Sobre Nome da pessoa cadastrada.',
        },
        nascimento: {
          field: 'nascimentoPes',
          type: Sequelize.DATEONLY,
          comment: 'Data de nascimento da pessoa cadastrada.',
        },
        sexo: {
          field: 'sexoPes',
          defaultValue: 'F',
          type: Sequelize.CHAR(1),
          comment: 'Sexo da pessoa cadastrada podendo assumir valores F ou M.',
        },
        cpf: {
          field: 'cpfPes',
          type: Sequelize.STRING(11),
          comment: 'Número do CPF da pessoa cadastrada, somente números.',
        },
        rg: {
          field: 'rgPes',
          type: Sequelize.STRING(9),
          comment: 'Número do RG da pessoa cadastrada, somente números.',
        },
        ativo: {
          field: 'ativoPes',
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
          comment: 'Indica se a pessoa está ativa para ser utilizada.',
        },
        createdAt: {
          field: 'createAtPes',
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          field: 'updatedAtPes',
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        schema: 'carp', // default: public, PostgreSQL only.
        comment:
          'Tabela utilizada para armazenar os dados de pessoas do sistema.',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pessoa')
  },
}
