const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Recurso extends BaseModel { }

  Recurso.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      comment: 'Id na tabela, identificando registro único.',
    },
    UUId: {
      field: 'UUIdRec',
      allowNull: false,
      type: DataTypes.UUID,
      comment: 'UUID do Recurso, utilizado para acessar os dados.',
      validate: {
        notNull: true,
      },
    },
    nome: {
      field: 'nomeRec',
      allowNull: false,
      type: DataTypes.STRING(30),
      comment: 'Nome do Recurso.',
      unique: true,
    },
    descricao: {
      field: 'descricaoRec',
      type: DataTypes.TEXT,
      comment: 'Descrição do Recurso.',
    },
    ativo: {
      field: 'ativoRec',
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN,
      comment: 'Indica se o Recário está ativo para acesso ao sistema.',
    },
    createdAt: {
      field: 'createAtRec',
      allowNull: false,
      type: DataTypes.DATE,
      comment: 'Data de ciração do registro.',
    },
    updatedAt: {
      field: 'updatedAtRec',
      allowNull: false,
      type: DataTypes.DATE,
      comment: 'Data de atualização do registro.',
    },
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    modelName: 'Recurso',
    comment: 'Tabela utilizada para armazenar os dados de Recursos do sistema.',
  });

  Recurso.associate = function (models) {
    Recurso.belongsToMany(models.Perfil, {
      foreignKey: 'RecursoId',
      otherKey: 'PerfilId',
      through: models.RecursoPerfil,
      uniqueKey: 'recurco_perfil_unique',
      as: 'perfis',
    });
  };

  return Recurso;
};
