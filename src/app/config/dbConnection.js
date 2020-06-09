var Sequelize = require("sequelize");
var connecPostgre = function () {
  return new Sequelize("postgres://gcps:gcps@localhost:5432/gcps", {
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  });
};
module.exports = function () {
  return connecPostgre;
};
