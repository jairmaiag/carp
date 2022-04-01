const Conection  = require("../../db/config/conection");
const { serverError, ok } = require('../../app/helpers/http/HttpHelpers')

class MainController {
  constructor(app) {
    this.app = app
    this.bancoCarp = { 
      usuario: process.env.DATABASEUSERNAME,
      senha:process.env.DATABASEPASSWORD,
      host:process.env.DATABASEHOST,
      porta: process.env.DATABASPORT,
      banco:process.env.DATABASENAME,
      esquema: process.env.DATABASESCHEMA
    }
 
  }

  index(req, res) {
    try {
      let porta = process.env.PORT == 80 ? "" : ":" + process.env.PORT
      let nomeApp = process.env.APP_NAME;
      return ok(`Sistema ${nomeApp} Ativo! Para criação de banco acesse http://localhsot${porta}/criarbanco usando o method POST.`)
    } catch (error) {
      return serverError(error)
    }
  }

  montarStringConexao(dadosConexaoPadrao) {
    try {
      const { usuario, senha, host, porta, banco } = dadosConexaoPadrao;
      return `postgres://${usuario}:${senha}@${host}:${porta}/${banco}`;
    } catch (error) {
      return serverError(error)
    }
  }
  async usuarioAcessoExistente(cliente) {
    const users = await cliente.query("select usename from pg_user");
    const existUser = users.find(user => user.usename === this.bancoCarp.banco);
    return existUser !== undefined;
  }
  async criarUsuario(cliente) {
    /* Criação do usuário de acesso ao banco */
    let mensagem = `Usuário de banco já existe. Saindo da criação do usuario. Aguarde a verificação do banco...`;
    try {
        if (await this.usuarioAcessoExistente(cliente)) {
          console.info(mensagem);
          return ok(mensagem);
        }

        const criarUsuario =
          `CREATE ROLE ${this.bancoCarp.banco} WITH LOGIN SUPERUSER CREATEDB CREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1 PASSWORD '${this.bancoCarp.banco}'`;
        mensagem = `Criando usuario...`;
        console.info(mensagem);
        const newUser = await cliente.query(criarUsuario);
        if (await this.usuarioAcessoExistente(cliente)) {
          console.info('Criação do usuário de banco concluída.');
          return ok(mensagem);
        }else{
          throw new Error('Erro na criação do usuário de acesso ao banco.');
        }
    } catch (error) {
      return serverError(error)
    }
  }

  async criarBanco(dadosConexao) {
    try {
      let mensagem = `Banco já existe. Consultando o schema.`;
      const conexao = new Conection(this.montarStringConexao(dadosConexao));
      await this.criarUsuario(conexao);
      /* Criação do banco de dados */
      const dataBases = await conexao.query('SELECT datname FROM pg_database');
      const existDataBase = dataBases.find(data => data.datname === this.bancoCarp.banco);
      let existe = existDataBase !== undefined;
      if(!existe){
        const criarBanco = `CREATE DATABASE ${this.bancoCarp.banco} WITH OWNER = ${this.bancoCarp.banco} ENCODING = 'UTF8' CONNECTION LIMIT = -1`;
        console.info('Criando banco...');
        await conexao.query(criarBanco);
        console.info('Criação de banco concluída!');
      }else{
        console.info(mensagem);
      }
      const conexaoCarp = new Conection(this.montarStringConexao(this.bancoCarp));

      const schemas =  await conexaoCarp.showAllSchemas();
      if(schemas.length === 0){
        console.info('Criando schema...');
        conexaoCarp.createSchema(this.bancoCarp.esquema);
      }else{
        const existSchema = schemas.find(data => data === this.bancoCarp.banco);
        if(existSchema === undefined){
          console.info('Criando schema...');
          conexaoCarp.createSchema(this.bancoCarp.esquema);
        }else{
          console.info('Schema já criado...');
        }
      }
      
      await conexaoCarp.close();
      await conexao.close();
      return ok({mensagem:'Criação de banco concluída. Verifique também o console do nodejs para ver os resultados.', data: this.bancoCarp});
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = () => MainController;
