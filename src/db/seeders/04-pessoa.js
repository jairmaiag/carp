module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Pessoa', [{
      nomePes: 'Jair',
      nomeMeioPes: 'Maia',
      sobrenomePes: 'Diniz',
      createAtPes: new Date(),
      updatedAtPes: new Date(),
      sexoPes: 'M',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pessoa', null, {});
  },
};
