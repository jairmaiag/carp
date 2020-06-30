const Sequelize = require('sequelize')

const connectPostgre = function () {
  return new Sequelize('postgres://gcps:gcps@localhost:5432/gcps', {
    define: {
      freezeTableName: true,
      timestamps: true,
    },
  })
}

module.exports = () => connectPostgre
