'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produto', {
      UUId: {
        field: "uuidProd",
			  allowNull: false,
			  type: Sequelize.UUID,
			  defaultValue: Sequelize.UUIDV4
      },
      id: {
        field: "idProd",
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      codigo: {
        field: "codigoProd",
        allowNull: false,
        type: Sequelize.STRING(16),
      },
      nome: {
        field: "nomeProd",
        allowNull: false,
        type: Sequelize.STRING(200),
      },
      descricao: {
        field: "descricaoProd",
        type: Sequelize.TEXT,
      },
      codigoBarras: {
        field: "codigoBarrasProd",
        type: Sequelize.STRING(16),
      },
      referencia: {
        field: "referenciaProd",
        type: Sequelize.STRING(25),
      },
      status: {
        field: "statusPod",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      imagem: {
        field: "imagemProd",
        type: Sequelize.STRING(250),
      },
      controleEstoque: {
        field: "controleEstoqueProd",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      unidadeMedida: {
        field: "unidadeMedidaProd",
        allowNull: false,
        type: Sequelize.STRING(3),
      },
      UnidadeCompra: {
        field: "UnidadeCompraProd",
        allowNull: false,
        type: Sequelize.STRING(3),
      },
      fatorConversao: {
        field: "fatorConversaoProd",
        allowNull: false,
        type: Sequelize.NUMERIC(16, 8),
      },
      pesoLiquido: {
        field: "pesoLiquidoProd",
        allowNull: false,
        type: Sequelize.NUMERIC(9, 3),
      },
      pesoBruto: {
        field: "pesoBrutoProd",
        allowNull: false,
        type: Sequelize.NUMERIC(9, 3),
      },
      margemLucro: {
        field: "margemLucroProd",
        allowNull: false,
        type: Sequelize.NUMERIC(6, 2),
      },
      precoVenda: {
        field: "precoVendaProd",
        allowNull: false,
        type: Sequelize.NUMERIC(16, 4),
      },
      saldoFinanceiro: {
        field: "saldoFinanceiroProd",
        allowNull: false,
        type: Sequelize.NUMERIC(16, 6),
      },
      estoqueQuantidade: {
        field: "estoqueQuantidadeProd",
        allowNull: false,
        type: Sequelize.NUMERIC(16, 6),
      },
      createdAt: {
        field: "createAtProd",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updatedAtProd",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produto');
  }
};