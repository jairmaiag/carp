"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createSchema("carp");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropSchema("carp");
  },
};
