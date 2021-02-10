'use strict'

const BaseModel = require('./basemodel')

module.exports = (sequelize, DataTypes) => {
  class RecursoPerfil extends BaseModel { }

  RecursoPerfil.init({
    RecursoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recurso',
        key: 'id'
      },
      comment: 'Id do recurso.',
    },
    PerfilId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Perfil',
            key: 'idPer'
        },
        comment: 'Id do perfil.',
    }, 
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'RecursoPerfil',
    comment: 'Tabela utilizada para armazenar os dados de Recurso de dos perfis.'
  })

  RecursoPerfil.associate = function (models) { 
    RecursoPerfil.hasMany(models.Perfil,{
      as:'Perfil',
      foreignKey:'id',
      otherKey:'PerfilId'
    })
    RecursoPerfil.hasMany(models.Recurso,{
      as:'Recurso',
      foreignKey:'id',
      otherKey:'RecursoId'
    })
  };

  return RecursoPerfil
}
