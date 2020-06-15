var Sequelize = require("sequelize");
var connecPostgre = function () {
  return new Sequelize("postgres://carp:carp@localhost:5432/carp", {
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  });
};
module.exports = function () {
  return connecPostgre;
};
