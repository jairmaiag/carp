'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Produto', 
      {
        UUId: {
          field: 'UUIdPro',
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        id: {
          field: 'idPro',
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        codigo: {
          field: 'codigoPro',
          allowNull: false,
          type: Sequelize.STRING(16),
        },
        nome: {
          field: 'nomePro',
          allowNull: false,
          type: Sequelize.STRING(200),
        },
        descricao: {
          field: 'descricaoPro',
          type: Sequelize.TEXT,
        },
        codigoBarras: {
          field: 'codigoBarrasPro',
          type: Sequelize.STRING(16),
        },
        referencia: {
          field: 'referenciaPro',
          type: Sequelize.STRING(25),
          comment: 'Referencia do produto que pode vir do fornecedor.',
        },
        status: {
          field: 'statusPro',
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 1,
          comment: '1 - Ativo, 2 - Inativo',
        },
        controleEstoque: {
          field: 'controleEstoquePro',
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 3,
          comment: '1 - Não controlar, 2 - Controlar c/Saldo Negativo, 3 - Controlar',
        },
        unidadeMedida: {
          field: 'unidadeMedidaPro',
          allowNull: false,
          type: Sequelize.STRING(3),
          defaultValue: 'UN',
        },
        UnidadeCompra: {
          field: 'UnidadeCompraPro',
          allowNull: false,
          type: Sequelize.STRING(3),
          defaultValue: 'UN',
        },
        fatorConversao: {
          field: 'fatorConversaoPro',
          allowNull: false,
          type: Sequelize.NUMERIC(16, 8),
          defaultValue: 1,
        },
        pesoLiquido: {
          field: 'pesoLiquidoPro',
          allowNull: false,
          type: Sequelize.NUMERIC(9, 3),
          defaultValue: 0,
        },
        pesoBruto: {
          field: 'pesoBrutoPro',
          allowNull: false,
          type: Sequelize.NUMERIC(9, 3),
          defaultValue: 0,
        },
        margemLucro: {
          field: 'margemLucroPro',
          allowNull: false,
          type: Sequelize.NUMERIC(6, 2),
          defaultValue: 0,
        },
        precoVenda: {
          field: 'precoVendaPro',
          allowNull: false,
          type: Sequelize.NUMERIC(16, 4),
          defaultValue: 0,
        },
        saldoFinanceiro: {
          field: 'saldoFinanceiroPro',
          allowNull: false,
          type: Sequelize.NUMERIC(16, 6),
          defaultValue: 0,
          comment: 'Quantidade x preco de venda',
        },
        estoqueQuantidade: {
          field: 'estoqueQuantidadePro',
          allowNull: false,
          type: Sequelize.NUMERIC(16, 6),
          defaultValue: 0,
        },
        createdAt: {
          field: 'createAtPro',
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          field: 'updatedAtPro',
          allowNull: false,
          type: Sequelize.DATE
        },
      },
      {
        schema: 'carp', // default: public, PostgreSQL only.
        comment:
          'Tabela utilizada para armazenar os dados do produto.',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Produto')
  }
}
