'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
   await queryInterface.bulkInsert('Pessoa', [{
      nomePes: 'Jair',
      nomeMeioPes: 'Maia',
      sobrenomePes:'Diniz',
      UUIdPes: uuid_generate_v4()
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Pessoa', null, {});
  }
};
