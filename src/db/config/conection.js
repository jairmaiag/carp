const { Sequelize, QueryTypes } = require('sequelize');
const DbUtil = require("../DbUtil");
class Conection {
    constructor(stringConexao) {
        const conexao = stringConexao || DbUtil.getObjectConnection();
        this.acesso = new Sequelize(conexao);
    }

    async getConection() {
        return this.acesso;
    }

    async testConection() {
        try {
            const retorno = await this.acesso.authenticate()
            process.env.DATABASEUP = retorno === undefined;
            return retorno
        } catch (error) {
            return error;
        }
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