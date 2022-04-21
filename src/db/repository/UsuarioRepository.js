const BaseRepository = require('../interfaces/BaseRepository');
const { Usuario } = require("../models");
const { getUUIDV4 } = require('../../app/util/UUIDGenerator');
const criptor = require('../../app/util/Cryptography');
const PessoaRepository = require('./PessoaRepository')();
const includePessoa = { association: 'Pessoa', attributes: ['UUId', 'nome', 'nomemeio', 'sobrenome', 'nascimento', 'sexo', 'cpf', 'rg', 'ativo'] };
const attributesExcludes = { exclude: ['idPessoa', 'idPes', 'senha'] };

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario,[]);
  }

  // static async findAll(attributes, filter, order) {
  //   const limitObj = filter ? null : 10;
  //   const orderObj = order || [['id', 'ASC']];
  //   return await Usuario.findAll({ attributes: attributesExcludes, where: filter, limit: limitObj, order: orderObj, raw: fasle });
  // }

  // static async findAndPaginate(attributes, filter, order, page) {
  //   return await Usuario.findAndPaginate(attributesExcludes, filter, order, page, includePessoa);
  // }

  // static async findByUUId(UUId) {
  //   let objFind = { where: { UUId: UUId }, attributes: attributesExcludes, include: includePessoa };
  //   return await Usuario.findOne(objFind);
  // }

  // static async findById(id) {
  //   let objPk = { attributes: attributesExcludes, include: includePessoa, };
  //   return await Usuario.findByPk(id, objPk);
  // }
  // static async dadosPessoa(dados) {
  //   let pessoa = null;
  //   if (dados.idPessoa) {
  //     pessoa = await PessoaRepository.findById(dados.idPessoa);
  //   }
  //   if (!pessoa) {
  //     const uuid = getUUIDV4();
  //     if (!dados.Pessoa) {
  //       pessoa = await PessoaRepository.insert({ nome: dados.login, UUId: uuid, ativo: true })
  //     } else {
  //       dados.Pessoa.UUId = dados.Pessoa.UUId || uuid;
  //       dados.Pessoa.nome = dados.Pessoa.nome || dados.login;
  //       dados.Pessoa.nomemeio = dados.Pessoa.nomemeio || null;
  //       dados.Pessoa.sobrenome = dados.Pessoa.sobrenome || null
  //       dados.Pessoa.sexo = dados.Pessoa.sexo || 'F'
  //       dados.Pessoa.nascimento = dados.Pessoa.nascimento || null;
  //       dados.Pessoa.ativo = dados.Pessoa.ativo || true;
  //       pessoa = await PessoaRepository.findDuplicate(dados.Pessoa);
  //       if (pessoa) {
  //         throw new Error("violates unique constraint");
  //       } else {
  //         pessoa = await PessoaRepository.insert(dados.Pessoa);
  //       }
  //     }
  //   }
  //   return pessoa;
  // }

  // static async insert(dados) {
  //   try {
  //     dados.Pessoa = await this.dadosPessoa(dados);
  //     dados.idPessoa = dados.Pessoa.id;
  //     dados.ativo = dados.ativo || true;
  //     dados.senha = criptor.cryptor(dados.senha.trim());
  //     const result = await Usuario.create(dados);
  //     result.Pessoa = dados.Pessoa;
  //     const complete = await this.findById(result.id);
  //     return complete;
  //   } catch (error) {
  //     if(error.original){
  //       throw new Error(error.original);
  //     }else{
  //       throw new Error(error.message);
  //     }
  //   }
  // }

  // static async update(dados) {
  //   let retorno = null
  //   if (dados.Pessoa) {
  //     Pessoaepository.update(dados.Pessoa)
  //   }
  //   const result = await Usuario.update(dados, { where: { UUId: dados.UUId } })
  //   if (result[0] === 1) {
  //     retorno = await this.findByUUId(dados.UUId)
  //   }
  //   return retorno
  // }

  // static async delete(UUId) {
  //   const result = await Usuario.destroy({
  //     where: { UUId: UUId },
  //   })

  //   return result
  // }

  static async findByLoginSenha(filter) {
    filter.senha = criptor.cryptor(filter.senha.trim());
    const result = await Usuario.findOne(
      {
        attributes: attributesExcludes,
        where: {
          login: filter.login,
          senha: filter.senha,
        },
        include: includePessoa
      },
      { raw: true }
    )
    return result
  }
}
module.exports = () => new UsuarioRepository();
