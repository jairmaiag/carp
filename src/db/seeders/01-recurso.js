'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Recurso', [
      {
        nomeRec: 'IncluirRecurso',
        descricaoRec: 'Permite a inclusão de um Recurso',
        ativoRec: true,
        createAtRec: new Date(),
        updatedAtRec: new Date()
      },
      {
        nomeRec: 'AlterarRecurso',
        descricaoRec: 'Permite a alteração de um Recurso',
        ativoRec:true,
        createAtRec: new Date(),
        updatedAtRec: new Date()
       },
       {
        nomeRec: 'ExcluirRecurso',
        descricaoRec: 'Permite a exclusão de um Recurso',
        ativoRec:true,
        createAtRec: new Date(),
        updatedAtRec: new Date()
       },
       {
        nomeRec: 'ListarRecurso',
        descricaoRec: 'Permite a listagem de um Recurso',
        ativoRec:true,
        createAtRec: new Date(),
        updatedAtRec: new Date()
       },
       {
        nomeRec: 'IncluirPerfil',
        descricaoRec: 'Permite a inclusão de um Perfil',
        ativoRec: true,
        createAtRec: new Date(),
        updatedAtRec: new Date()
      },
      {
        nomeRec: 'AlterarPerfil',
        descricaoRec: 'Permite a alteração de um Perfil',
        ativoRec:true,
        createAtRec: new Date(),
        updatedAtRec: new Date()
       },
       {
        nomeRec: 'ExcluirPerfil',
        descricaoRec: 'Permite a exclusão de um Perfil',
        ativoRec:true,
        createAtRec: new Date(),
        updatedAtRec: new Date()
       },
       {
        nomeRec: 'ListarPerfil',
        descricaoRec: 'Permite a listagem de um Perfil',
        ativoRec:true,
        createAtRec: new Date(),
        updatedAtRec: new Date()
       }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recurso', null, {});
  }
};
