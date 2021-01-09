'use strict'

const BaseModel = require('./basemodel')

module.exports = (sequelize, DataTypes) => {
  class Produto extends BaseModel { }

  // module.exports = class Produto extends BaseModel {
  //   constructor(sequelize, DataTypes) {
  //     super()
  //   }

  //   static init() {
  //     return super.init({

  Produto.init({
    UUId: {
      field: 'UUIdPro',
      allowNull: false,
      type: DataTypes.UUID,
      validate: {
        notNull: true
      }
    },
    id: {
      field: 'idPro',
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    codigo: {
      field: 'codigoPro',
      allowNull: false,
      type: DataTypes.STRING(16),
    },
    nome: {
      field: 'nomePro',
      allowNull: false,
      type: DataTypes.STRING(200),
    },
    descricao: {
      field: 'descricaoPro',
      type: DataTypes.TEXT,
    },
    codigoBarras: {
      field: 'codigoBarrasPro',
      type: DataTypes.STRING(16),
    },
    referencia: {
      field: 'referenciaPro',
      type: DataTypes.STRING(25),
      comment: 'Referencia do produto que pode vir do fornecedor.',
    },
    status: {
      field: 'statusPro',
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '1 - Ativo, 2 - Inativo',
    },
    controleEstoque: {
      field: 'controleEstoquePro',
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 3,
      comment: '1 - Não controlar, 2 - Controlar c/Saldo Negativo, 3 - Controlar',
    },
    unidadeMedida: {
      field: 'unidadeMedidaPro',
      allowNull: false,
      type: DataTypes.STRING(3),
      defaultValue: 'UN',
    },
    UnidadeCompra: {
      field: 'UnidadeCompraPro',
      allowNull: false,
      type: DataTypes.STRING(3),
      defaultValue: 'UN',
    },
    fatorConversao: {
      field: 'fatorConversaoPro',
      allowNull: false,
      type: DataTypes.NUMERIC(16, 8),
      defaultValue: 1,
    },
    pesoLiquido: {
      field: 'pesoLiquidoPro',
      allowNull: false,
      type: DataTypes.NUMERIC(9, 3),
      defaultValue: 0,
    },
    pesoBruto: {
      field: 'pesoBrutoPro',
      allowNull: false,
      type: DataTypes.NUMERIC(9, 3),
      defaultValue: 0,
    },
    margemLucro: {
      field: 'margemLucroPro',
      allowNull: false,
      type: DataTypes.NUMERIC(6, 2),
      defaultValue: 0,
    },
    precoVenda: {
      field: 'precoVendaPro',
      allowNull: false,
      type: DataTypes.NUMERIC(16, 4),
      defaultValue: 0,
    },
    saldoFinanceiro: {
      field: 'saldoFinanceiroPro',
      allowNull: false,
      type: DataTypes.NUMERIC(16, 6),
      defaultValue: 0,
      comment: 'Quantidade x preco de venda',
    },
    estoqueQuantidade: {
      field: 'estoqueQuantidadePro',
      allowNull: false,
      type: DataTypes.NUMERIC(16, 6),
      defaultValue: 0,
    },
    createdAt: {
      field: 'createAtPro',
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updatedAtPro',
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    modelName: 'Produto',
  })

  return Produto
}
