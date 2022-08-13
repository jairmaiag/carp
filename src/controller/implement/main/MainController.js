const Conection = require("../../../db/config/conection");
const { serverError, ok } = require('../../../app/helpers/http/HttpHelpers');
const DbUtil = require("../../../db/DbUtil");

class MainController {
  constructor(app) {
    this.app = app
    this.bancoCarp = DbUtil.getDadosConexao();
  }
  validarCamposConexao(dados){
    return DbUtil.validarCamposConexao(dados);
  }
  async testarConexaoBanco(dadosConexao) {
    try {
      const con = new Conection(dadosConexao);
      const teste = await con.testConection();
      if (!teste) {
        return ok(`Ativo`);
      } else {
        const error = {
          "stack": teste
        }
        return serverError(error);
      }
    } catch (error) {
      return serverError(error)
    }
  }

  async index(req, res) {
    try {
      const porta = process.env.PORT == 80 ? "" : ":" + process.env.PORT
      const caminho = `http://localhost${porta}`;
      let textoAposStatus = `\n\n\tPara criação de banco de dados, acesse:\n\th${caminho}/criarbanco\n\tusando o method POST.`;
      const resposta = await this.testarConexaoBanco();
      const statusBancoOk = resposta.body.mensagem !== undefined;
      const textoStatusBanco = statusBancoOk ? resposta.body.mensagem : `Inativo.\n\tUtilize ${caminho}/testarconexaobanco para mais informações` ;
      if(!statusBancoOk){
        textoAposStatus='.'
      }
      const nomeApp = process.env.APP_NAME;
      return ok(`Bem vindo ao sistema '${nomeApp}', abaixo informações do sistema:${'\n'}Status API: Ativa,\n\tStatus banco: ${textoStatusBanco}${textoAposStatus}`);
    } catch (error) {
      return serverError(error)
    }
  }

  async usuarioAcessoExistente(cliente) {
    const users = await cliente.query("select usename from pg_user");
    const existUser = users.find(user => user.usename === this.bancoCarp.database);
    return existUser !== undefined;
  }
  async criarUsuario(cliente) {
    /* Criação do usuário de acesso ao banco */
    let mensagem = `Usuário de banco já existe. Saindo da criação do usuario. Aguarde a verificação do banco...`;
    try {
      if (await this.usuarioAcessoExistente(cliente)) {
        console.info(mensagem);
        return ok(mensagem);
      }else{
        const criarUsuario =
          `CREATE ROLE ${this.bancoCarp.database} WITH LOGIN SUPERUSER CREATEDB CREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1 PASSWORD '${this.bancoCarp.database}'`;
        mensagem = `Criando usuario...`;
        console.info(mensagem);
        const newUser = await cliente.query(criarUsuario);
      }

      if (await this.usuarioAcessoExistente(cliente)) {
        console.info('Criação do usuário de banco concluída.');
        return ok(mensagem);
      } else {
        throw new Error('Erro na criação do usuário de acesso ao banco.');
      }
    } catch (error) {
      return serverError(error)
    }
  }

  async criarBanco(dadosConexao) {
    try {
      let mensagem = `Banco já existe. Consultando o schema.`;
      const conexaoPostgres = new Conection(dadosConexao);
      const retornoCriarUsuario = await this.criarUsuario(conexaoPostgres);
      if(retornoCriarUsuario.statusCode !== 200){
        return serverError(retornoCriarUsuario.body);
      }
      /* Criação do banco de dados */
      const dataBases = await conexaoPostgres.query('SELECT datname FROM pg_database');
      const existDataBase = dataBases.find(data => data.datname === this.bancoCarp.database);
      let existe = existDataBase !== undefined;
      if (!existe) {
        const criarBanco = `CREATE DATABASE ${this.bancoCarp.database} WITH OWNER = ${this.bancoCarp.database} ENCODING = 'UTF8' CONNECTION LIMIT = -1`;
        console.info('Criando banco...');
        await conexaoPostgres.query(criarBanco);
        console.info('Criação de banco concluída!');
      } else {
        console.info(mensagem);
      }
      const conexaoCarp = new Conection(DbUtil.getStringConexao(this.bancoCarp));

      const schemas = await conexaoCarp.showAllSchemas();
      if (schemas.length === 0) {
        console.info('Criando schema...');
        conexaoCarp.createSchema(this.bancoCarp.esquema);
      } else {
        const existSchema = schemas.find(data => data === this.bancoCarp.database);
        if (existSchema === undefined) {
          console.info('Criando schema...');
          conexaoCarp.createSchema(this.bancoCarp.esquema);
        } else {
          console.info('Schema já criado...');
        }
      }

      await conexaoCarp.close();
      await conexaoPostgres.close();
      return ok({ mensagem: 'Criação de banco concluída. Verifique também o console do nodejs para ver os resultados.', data: this.bancoCarp });
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = () => MainController;
