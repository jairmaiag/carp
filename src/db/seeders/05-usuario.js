module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuario', [{
      loginUsu: 'admin@admin.com',
      senhaUsu: 'admin',
      idPes: 1,
      createAtUsu: new Date(),
      updatedAtUsu: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pessoa', null, {});
  },
};
