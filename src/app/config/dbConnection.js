const Sequelize = require('sequelize')

const connectPostgre = function () {
  return new Sequelize('postgres://carp:carp@localhost:5432/carp', {
    define: {
      freezeTableName: true,
      timestamps: true,
    },
  })
}

module.exports = () => connectPostgre
