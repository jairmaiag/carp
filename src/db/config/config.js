module.exports = {
  development: {
    username: 'carp',
    password: 'carp',
    database: 'carp',
    schema: 'carp',
    dialect: 'postgres',
    logging: false,
    searchPath: 'carp',
    supportsSearchPath: true,
    host: 'localhost',
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
    logging: false,
    searchPath: 'test',
    supportsSearchPath: true,
    host: 'localhost',
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
