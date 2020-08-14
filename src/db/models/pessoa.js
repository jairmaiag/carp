'use strict'

const BaseModel = require('./BaseModel')

module.exports = (sequelize, DataTypes) => {
  class Pessoa extends BaseModel {}

  Pessoa.init(
    {
      UUId: {
        field: 'UUIdPes',
        allowNull: false,
        type: DataTypes.UUID,
        validate: {
          notNull: true,
        },
        comment: 'UUId na tabela, identificando registro único.',
      },
      id: {
        field: 'idPes',
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        comment: 'Id na tabela, identificando registro único.',
      },
      nome: {
        field: 'nomePes',
        allowNull: false,
        type: DataTypes.STRING(20),
        comment: 'Nome da pessoa cadastrada.',
      },
      nomeMeio: {
        field: 'nomeMeioPes',
        type: DataTypes.STRING(20),
        comment: 'Nome do meio da pessoa cadastrada.',
      },
      sobrenome: {
        field: 'sobrenomePes',
        type: DataTypes.STRING(20),
        comment: 'Sobre Nome da pessoa cadastrada.',
      },
      nascimento: {
        field: 'nascimentoPes',
        type: DataTypes.DATE,
        comment: 'Data de nascimento da pessoa cadastrada.',
      },
      sexo: {
        field: 'sexoPes',
        type: DataTypes.STRING,
        comment: 'Sexo da pessoa cadastrada podendo assumir valores F ou M.',
      },
      cpf: {
        field: 'cpfPes',
        type: DataTypes.STRING(11),
        comment: 'Número do CPF da pessoa cadastrada, somente números.',
      },
      rg: {
        field: 'rgPes',
        type: DataTypes.STRING(9),
        comment: 'Número do RG da pessoa cadastrada, somente números.',
      },
      ativo: {
        field: 'ativoPes',
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        comment: 'Indica se a pessoa está ativa para ser utilizada.',
      },
      createdAt: {
        field: 'createAtPes',
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updatedAtPes',
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
      modelName: 'Pessoa',
      comment: 'Tabela utilziada para armazenar os dados de uma pessoa.',
    }
  )

  Pessoa.associate = function (models) {
    Pessoa.hasOne(models.Usuario, {
      as: 'Usuario',
      foreignKey: 'idPes',
      targetKey: 'idPes',
      allowNull: true,
    })
  }

  return Pessoa
}
