class DbUtil {
    getIncludePessoa() {
        return { association: 'Pessoa', attributes: ['UUId', 'nome', 'nomemeio', 'sobrenome', 'nascimento', 'sexo', 'cpf', 'rg', 'ativo'] };
    }
    
    getIncludeUsuario(){
        return { association: 'Usuario', attributes: ['UUId', 'login', 'expira', 'ativo'] };
    }
}

module.exports = new DbUtil();