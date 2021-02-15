module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"', { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.sequelize.query('DROP EXTENSION "uuid-ossp"', { transaction: t }),
  ])),
};
