require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DATABASEUSERNAME,
    password: process.env.DATABASEPASSWORD,
    database: process.env.DATABASENAME,
    schema: process.env.DATABASESCHEMA,
    dialect: 'postgres',
    port: process.env.DATABASPORT,
    logging: null,
    searchPath: 'carp',
    supportsSearchPath: true,
    host: process.env.DATABASEHOST,
    freezeTableName: true,
    timestamps: true,
    dialectOptions: {
      'prependSearchPath': true
    }
  },
  test: {
    username: 'test',
    password: 'test',
    database: 'test',
    schema: 'test',
    dialect: 'postgres',
    port: 5432,
    logging: false,
    searchPath: 'test',
    supportsSearchPath: true,
    host: process.env.DATABASEHOST,
    freezeTableName: true,
    timestamps: true,
    dialectOptions: {
      'prependSearchPath': true
    }
  },
  production: {
    username: process.env.DATABASEUSERNAME,
    password: process.env.DATABASEPASSWORD,
    database: process.env.DATABASENAME,
    schema: process.env.DATABASESCHEMA,
    dialect: 'postgres',
    port: process.env.DATABASPORT,
    logging: false,
    searchPath: 'test',
    supportsSearchPath: true,
    host: process.env.DATABASEHOST,
    freezeTableName: true,
    timestamps: true,
    dialectOptions: {
      'prependSearchPath': true
    }
  }
}
