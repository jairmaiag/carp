'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.sequelize.query('ALTER TABLE carp."Usuario" ALTER COLUMN "UUIdUsu" SET DEFAULT uuid_generate_v4()', { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        //queryInterface.sequelize.query('ALTER TABLE Pessoa ALTER COLUMN "UUIdPes" SET DEFAULT uuid_generate_v4()', { transaction: t })
      ])
    })
  }
};

