const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const databaseConfig = require('../config/config')[env];

databaseConfig.username = process.env.DATABASEUSERNAME || databaseConfig.username;
databaseConfig.password = process.env.DATABASEPASSWORD || databaseConfig.password;
databaseConfig.database = process.env.DATABASENAME || databaseConfig.database;
databaseConfig.host = process.env.DATABASEHOST || databaseConfig.host;
databaseConfig.schema = process.env.DATABASESCHEMA || databaseConfig.schema;

const db = {};

let sequelize;
if (databaseConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[databaseConfig.use_env_variable], databaseConfig);
} else {
  sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig);
}

fs.readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0
    && file !== basename
    && file.slice(-3) === '.js'
    && (file.toLowerCase() !== 'basemodel.js')
  ))
  .forEach((file) => {
    // const model = sequelize.import(path.join(__dirname, file.toLowerCase())) // removido na versão 6
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Teste: Verificando a conexão com o banco de dados
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err)
//   })

module.exports = db;
