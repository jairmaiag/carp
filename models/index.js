'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}

/* Arquivo de inclusão dos arquivos da pasta models no sequelize */
config.username = process.env.DATABASEUSERNAME || config.username
config.password = process.env.DATABASEPASSWORD || config.password
config.database = process.env.DATABASENAME || config.database
config.host = process.env.DATABASEHOST || config.host

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
      && (file.toLowerCase() !== 'index.js') && (file.toLowerCase() !== 'basemodel.js')
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
