'use strict';

module.exports = (sequelize, DataTypes) => {
  const tabela = "produto";
  const campos = {
     UUId: {
      field: "uuidProd",
      allowNull: false,
      type: DataTypes.UUID,
      validate: {
        notNull: true
      }
    },
    id: {
      field: "idProd",
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    codigo: {
      field: "codigoProd",
      allowNull: false,
      type: DataTypes.STRING(16),
    },
    nome: {
      field: "nomeProd",
      allowNull: false,
      type: DataTypes.STRING(200),
    },
    descricao: {
      field: "descricaoProd",
      type: DataTypes.TEXT,
    },
    codigoBarras: {
      field: "codigoBarrasProd",
      type: DataTypes.STRING(16),
    },
    referencia: {
      field: "referenciaProd",
      type: DataTypes.STRING(25),
    },
    status: {
      field: "statusPod",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    imagem: {
      field: "imagemProd",
      type: DataTypes.STRING(250),
    },
    controleEstoque: {
      field: "controleEstoqueProd",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    unidadeMedida: {
      field: "unidadeMedidaProd",
      allowNull: false,
      type: DataTypes.STRING(3),
    },
    UnidadeCompra: {
      field: "UnidadeCompraProd",
      allowNull: false,
      type: DataTypes.STRING(3),
    },
    fatorConversao: {
      field: "fatorConversaoProd",
      allowNull: false,
      type: DataTypes.NUMERIC(16, 8),
    },
    pesoLiquido: {
      field: "pesoLiquidoProd",
      allowNull: false,
      type: DataTypes.NUMERIC(9, 3),
    },
    pesoBruto: {
      field: "pesoBrutoProd",
      allowNull: false,
      type: DataTypes.NUMERIC(9, 3),
    },
    margemLucro: {
      field: "margemLucroProd",
      allowNull: false,
      type: DataTypes.NUMERIC(6, 2),
    },
    precoVenda: {
      field: "precoVendaProd",
      allowNull: false,
      type: DataTypes.NUMERIC(16, 4),
    },
    saldoFinanceiro: {
      field: "saldoFinanceiroProd",
      allowNull: false,
      type: DataTypes.NUMERIC(16, 6),
    },
    estoqueQuantidade: {
      field: "estoqueQuantidadeProd",
      allowNull: false,
      type: DataTypes.NUMERIC(16, 6),
    },
    createdAt: {
      field: "createAtProd",
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      field: "updatedAtProd",
      allowNull: false,
      type: DataTypes.DATE
    }
  };

  const opcoes = {
    tableName: tabela,
    comment: "Tabela utilziada para armazenar os dados de um produto.", 
  };

  var produto = sequelize.define("Produto", campos, opcoes);
  
  // Produto.associate = function (models) {
  // Produto.hasOne(models.Usuario, {
  //     as: "Usuario",
  //     foreignKey: "pesid",
  //     targetKey: "pesid",
  //     allowNull: true,
  //   });
  // };

  return produto;
};
