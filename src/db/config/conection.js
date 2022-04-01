const { Sequelize, QueryTypes } = require('sequelize');

class Conection {
    constructor(stringConexao) {
        this.stringConexao = stringConexao;
        this.acesso = new Sequelize(this.stringConexao);
    }
    async getConection() {
        return this.acesso;
    }

    async query(comandoSql) {
        return await this.acesso.query(comandoSql, { nest: true, type: QueryTypes.SELECT });
    }

    async getDatabaseName() {
        const retorno = await this.acesso.getDatabaseName();
        return retorno;
    }

    async close() {
        this.acesso.close();
    }

    async showAllSchemas() {
        const retorno = await this.acesso.showAllSchemas();
        return retorno;
    }

    async createSchema(schema) {
        const retorno = await this.acesso.createSchema(schema);
        await this.query(`GRANT ALL ON SCHEMA ${schema} TO ${schema}`);
        await this.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${schema} GRANT ALL ON TABLES TO ${schema}`);
        return retorno;
    }

}
module.exports = Conection;