'use strict'

const BaseModel = require('./basemodel')

module.exports = (sequelize, DataTypes) => {
  class Perfil extends BaseModel { }

  Perfil.init({
    id: {
      field: 'idPer',
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      comment: 'Id na tabela, identificando registro único.',
    },
    UUId: {
      field: 'UUIdPer',
      allowNull: false,
      type: DataTypes.UUID,
      comment: 'UUID do perfil, utilizado para acessar os dados.',
      validate: {
        notNull: true
      },
    },
    nome: {
      field: 'nomePer',
      allowNull: false,
      type: DataTypes.STRING(30),
      comment: 'Nome do perfil.',
    },
    descricao: {
      field: 'descricaoPer',
      type: DataTypes.TEXT,
      comment: 'Descrição do perfil.',
    },
    ativo: {
      field: 'ativoPer',
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN,
      comment: 'Indica se o Perário está ativo para acesso ao sistema.',
    },
    createdAt: {
      field: 'createAtPer',
      allowNull: false,
      type: DataTypes.DATE,
      comment: 'Data de ciração do registro.'
    },
    updatedAt: {
      field: 'updatedAtPer',
      allowNull: false,
      type: DataTypes.DATE,
      comment: 'Data de atualização do registro.'
    }
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    modelName: 'Perfil',
    comment: 'Tabela utilizada para armazenar os dados de perfil do Perário.'
  })

  Perfil.associate = function (models) {
  };

  return Perfil
}
