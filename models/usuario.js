"use strict";
module.exports = (sequelize, DataTypes) => {
  const tabela = "usuario";
  const campos = {
    id: {
      type: DataTypes.INTEGER,
      field: "usuid",
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      field: "usulogin",
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      field: "ususenha",
      allowNull: false,
    },
  };
  /* Definição de opções da entidade */
  const opcoes = {
    modelName: tabela,
    tableName: tabela,
    timestamps: false,
  };
  var Usuario = sequelize.define("Usuario", campos, opcoes);
  Usuario.associate = function (models) {
    /* Usuário pertence a (belongsTo) Pessoa */
    Usuario.belongsTo(models.Pessoa, {
      as: "Pessoa",
      foreignKey: "pesid",
      allowNull: true,
    });
  };
  return Usuario;
};
