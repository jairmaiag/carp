const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends BaseModel { }

  Usuario.init({
    UUId: {
      field: 'UUIdUsu',
      allowNull: false,
      type: DataTypes.UUID,
      comment: 'UUID do usuario, utilizado para acessar os dados.',
      validate: {
        notNull: true,
      },
    },
    id: {
      field: 'idUsu',
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      comment: 'Id na tabela, identificando registro único.',
    },
    login: {
      field: 'loginUsu',
      allowNull: false,
      type: DataTypes.STRING(30),
      comment: 'Login do usuário para acesso ao sistema.',
    },
    senha: {
      field: 'senhaUsu',
      allowNull: false,
      type: DataTypes.STRING(64),
      comment: 'Senha do usuário para acesso ao sistema.',
    },
    expira: {
      field: 'expirarUsu',
      allowNull: true,
      type: DataTypes.DATEONLY,
      comment: 'Data de expiração do usuário para acesso ao sistema.',
    },
    ativo: {
      field: 'ativoUsu',
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN,
      comment: 'Indica se o usuário está ativo para acesso ao sistema.',
    },
    idPessoa: {
      field: 'idPes',
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id da tabela Pessoa, onde este usuário pertence.',
    },
    createdAt: {
      field: 'createAtUsu',
      allowNull: false,
      type: DataTypes.DATE,
      comment: 'Data de ciração do registro.',
    },
    updatedAt: {
      field: 'updatedAtUsu',
      allowNull: false,
      type: DataTypes.DATE,
      comment: 'Data de atualização do registro.',
    },
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    modelName: 'Usuario',
    comment: 'Tabela utilizada para armazenar os dados do usuário para acesso ao sistema.',
  });

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Pessoa, {
      as: 'pessoa',
      foreignKey: 'idPes',
      allowNull: false,
    });
  };

  return Usuario;
};
