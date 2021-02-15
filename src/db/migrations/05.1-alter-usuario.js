module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.sequelize.query('ALTER TABLE carp."Usuario" ALTER COLUMN "UUIdUsu" SET DEFAULT uuid_generate_v4()', { transaction: t }),
    queryInterface.sequelize.query('ALTER TABLE carp."Usuario" ADD CONSTRAINT "loginUsuUnique" UNIQUE ("loginUsu")', { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    // queryInterface.sequelize.query('ALTER TABLE Pessoa ALTER COLUMN "UUIdPes" SET DEFAULT uuid_generate_v4()', { transaction: t })
  ])),
};
