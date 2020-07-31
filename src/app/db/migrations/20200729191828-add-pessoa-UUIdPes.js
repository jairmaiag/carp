'use strict'

const db = require('../models/index')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        db.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"', { transaction: t }),
        db.sequelize.query('ALTER TABLE "Pessoa" ADD COLUMN "UUIdPes" varchar(10)', { transaction: t }),
        db.sequelize.query('ALTER TABLE "Pessoa" ALTER COLUMN "UUIdPes" SET DATA TYPE UUID USING (uuid_generate_v4())', { transaction: t }),
      ])
    })
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        db.sequelize.query('ALTER TABLE "Pessoa" DROP COLUMN "UUIdPes"', { transaction: t })
      ])
    })
  }
}
