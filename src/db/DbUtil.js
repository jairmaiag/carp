const { serverError } = require('../app/helpers/http/HttpHelpers');
const { development , production } = require('../db/config/config');
class DbUtil {
    getIncludePessoa() {
        return { association: 'pessoa', attributes: ['UUId', 'nome', 'nomemeio', 'sobrenome', 'nascimento', 'sexo', 'cpf', 'rg', 'ativo'] };
    }

    getIncludeUsuario() {
        return { association: 'usuario', attributes: ['UUId', 'login', 'expira', 'ativo'] };
    }

    getIncludePerfis() {
        return { association: 'perfis', attributes: ['UUId', 'nome', 'descricao', 'ativo'] };

    }
    getIncludeRecursos() {
        return { association: 'recursos', attributes: ['UUId', 'nome', 'descricao', 'ativo'] };
    }

    validarCamposConexao(dados) {
        if (dados.host === undefined) {
            return false;
        }
        if (dados.port === undefined) {
            return false;
        }
        if (dados.database === undefined) {
            return false;
        }
        if (dados.username === undefined) {
            return false;
        }
        if (dados.password === undefined) {
            return false;
        }
        if (dados.dialect === undefined) {
            return false;
        }
        return true;
    }

    getDadosConexao() {
        const dados = {
            username: process.env.DATABASEUSERNAME,
            password: process.env.DATABASEPASSWORD,
            host: process.env.DATABASEHOST,
            port: process.env.DATABASPORT,
            database: process.env.DATABASENAME,
            esquema: process.env.DATABASESCHEMA,
            dialect: 'postgres'
        }
        return dados;
    }

    getObjectConnection(){
        if(process.env.NODE_ENV === 'development'){
            return development;
        }
        return production;
    }
    
    getStringConexao(dadosConexaoPadrao) {
        try {
            const dados = dadosConexaoPadrao || this.getDadosConexao();
            if (!this.validarCamposConexao(dados)) {
                return serverError({"error":{"stack":"Campos de conexão estão fora do esperado."}});
            }
            const { username, password, host, port, database } = dados;
            return `postgres://${username}:${password}@${host}:${port}/${database}`;
        } catch (error) {
            return serverError(error);
        }
    }
}

module.exports = new DbUtil();