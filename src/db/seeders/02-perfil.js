'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Perfil', [
      {
        nomePer: 'Administrador',
        descricaoPer: 'Perfil de administrador do sistema.',
        ativoPer: true,
        createAtPer: new Date(),
        updatedAtPer: new Date()
      },
      {
        nomePer: 'Usuario',
        descricaoPer: 'Perfil de usuário do sistema.',
        ativoPer: true,
        createAtPer: new Date(),
        updatedAtPer: new Date()
      },
      {
        nomePer: 'Cliente',
        descricaoPer: 'Perfil de cliente do sistema.',
        ativoPer: true,
        createAtPer: new Date(),
        updatedAtPer: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Perfil', null, {});
  }
};
