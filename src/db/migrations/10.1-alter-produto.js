module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.sequelize.query('ALTER TABLE carp."Produto" ALTER COLUMN "UUIdPro" SET DEFAULT uuid_generate_v4()', { transaction: t }),
    queryInterface.sequelize.query('ALTER TABLE carp."Produto" ADD CONSTRAINT "nomeProUnique" UNIQUE ("nomePro")', { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    // queryInterface.sequelize.query('ALTER TABLE Pessoa ALTER COLUMN "UUIdPes" SET DEFAULT uuid_generate_v4()', { transaction: t })
  ])),
};
