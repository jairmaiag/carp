const BaseRepository = require('../abstract/BaseRepository');
const { Usuario } = require("../models");
const { getUUIDV4 } = require('../../app/util/UUIDGenerator');
const DbUtil = require('../DbUtil');
const criptor = require('../../app/util/Cryptography');
const PessoaRepository = require('./PessoaRepository')();
const fieldsExcludes = ['idPessoa', 'idPes', 'senha'];

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario,[DbUtil.getIncludePessoa()]);
    this.addFieldExcludes(fieldsExcludes);
  }
  
  async findDuplicate(dados) {
    let { login, senha } = dados;
    return await this.model.findOne({ where: { login, senha } });
  }

  async beforeInsert(dados) {
    dados.Pessoa = await this.dadosPessoa(dados);
    dados.idPessoa = dados.Pessoa.id;
    dados.ativo = dados.ativo || true;
    dados.senha = criptor.cryptor(dados.senha.trim());
    console.log(dados);
    return dados;
  }

  async dadosPessoa(dados) {
    let pessoa = null;
    if (dados.idPessoa) {
      pessoa = await PessoaRepository.findById(dados.idPessoa);
    }
    if (!pessoa) {
      const uuid = getUUIDV4();
      if (!dados.Pessoa) {
        const excludes = PessoaRepository.getObjectExcludes();
        PessoaRepository.setObjectExcludes({});
        pessoa = await PessoaRepository.insert({ nome: dados.login, UUId: uuid, ativo: true });
        PessoaRepository.setObjectExcludes(excludes);
      } else {
        dados.Pessoa.UUId = dados.Pessoa.UUId || uuid;
        dados.Pessoa.nome = dados.Pessoa.nome || dados.login;
        dados.Pessoa.nomemeio = dados.Pessoa.nomemeio || null;
        dados.Pessoa.sobrenome = dados.Pessoa.sobrenome || null
        dados.Pessoa.sexo = dados.Pessoa.sexo || 'F'
        dados.Pessoa.nascimento = dados.Pessoa.nascimento || null;
        dados.Pessoa.ativo = dados.Pessoa.ativo || true;
        pessoa = await PessoaRepository.findDuplicate(dados.Pessoa);
        if (pessoa) {
          throw new Error("violates unique constraint");
        } else {
          pessoa = await PessoaRepository.insert(dados.Pessoa);
        }
      }
    }
    return pessoa;
  }

  async beforeUpdate(dados) {
    if (dados.Pessoa) {
      dados.Pessoa = await PessoaRepository.update(dados.Pessoa);
    }
    if(dados.senha){
      dados.senha = criptor.cryptor(dados.senha.trim());
    }
    return dados;
  }

  async findByLoginSenha(filter) {
    filter.senha = criptor.cryptor(filter.senha.trim());
    const result = await this.model.findOne(
      {
        attributes: this.getObjectExcludes(),
        where: {
          login: filter.login,
          senha: filter.senha,
        },
        include: this.includes
      },
      { raw: true }
    )
    return result
  }
}
module.exports = new UsuarioRepository();
