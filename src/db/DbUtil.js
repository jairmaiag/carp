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
        return { association: 'recursos', attributes: ['UUId', 'nome', 'descricao', 'ativo']};
    }

    getDadosConexao() {
        return {
            usuario: process.env.DATABASEUSERNAME,
            senha: process.env.DATABASEPASSWORD,
            host: process.env.DATABASEHOST,
            porta: process.env.DATABASPORT,
            banco: process.env.DATABASENAME,
            esquema: process.env.DATABASESCHEMA
        }
    }
    getStringConexao(dadosConexaoPadrao) {
        try {
            const { usuario, senha, host, porta, banco } = dadosConexaoPadrao;
            return `postgres://${usuario}:${senha}@${host}:${porta}/${banco}`;
        } catch (error) {
            return serverError(error)
        }
    }
}

module.exports = new DbUtil();