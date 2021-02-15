module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.sequelize.query('ALTER TABLE carp."Pessoa" ALTER COLUMN "UUIdPes" SET DEFAULT uuid_generate_v4()', { transaction: t }),
    queryInterface.sequelize.query('ALTER TABLE carp."Pessoa" ADD CONSTRAINT "nomePesUnique" UNIQUE ("nomePes", "nomeMeioPes", "sobrenomePes")', { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    // queryInterface.sequelize.query('ALTER TABLE Pessoa ALTER COLUMN "UUIdPes" SET DEFAULT uuid_generate_v4()', { transaction: t })
  ])),
};
