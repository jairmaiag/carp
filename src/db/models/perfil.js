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
      validate: {
        notNull: {
          msg: "O campo não pode ser nulo"
        },
        isAlpha: {
          args: true,
          msg: "O nome só pode possuir letras"
        },
        len: {
          args: [3, 30],
          msg: "O nome deve ter entre 3 e 30 caracteres"
        }
      }
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
  });

  Perfil.associate = function (models) {
    Perfil.belongsToMany(models.Recurso, {
      foreignKey: 'PerfilId',
      otherKey: 'RecursoId',
      through: models.RecursoPerfil,
      uniqueKey: 'recurco_perfil_unique',
      as: 'Recursos'
    });
  };

  return Perfil;
}
