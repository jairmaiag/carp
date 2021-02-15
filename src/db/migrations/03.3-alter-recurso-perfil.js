module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.sequelize.query('ALTER TABLE carp."RecursoPerfil" ADD CONSTRAINT PerfilId_RecursoId_pk PRIMARY KEY ("PerfilId", "RecursoId");', { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    // queryInterface.sequelize.query('ALTER TABLE Pessoa ALTER COLUMN "UUIdPes" SET DEFAULT uuid_generate_v4()', { transaction: t })
  ])),
};
