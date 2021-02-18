const { Client } = require("pg")
const { serverError, ok } = require('../../app/helpers/http/HttpHelpers')

class MainController {

  constructor(app) {
    this.app = app
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

  async criarUsuario(cliente) {
    /* Criação do usuário de acesso ao banco */
    try {
      await cliente.query("select usename from pg_user", (errusu, usus) => {
        let mensagem = null;
        let usubd = usus.rows.filter((usu) => usu.usename === "carp");
        if (usubd.length > 0) {
          mensagem = `Usuário de banco já existe. Saindo da criação do usuario. Aguarde a verificação do banco...`;
          console.log(mensagem);
          return ok(mensagem);
        }

        const criarUsuario =
          `CREATE ROLE carp WITH LOGIN SUPERUSER CREATEDB CREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1 PASSWORD 'carp'`;

        cliente.query(criarUsuario, (errusu, usu) => {
          console.log(`Criando usuario...`);
        })
      })
    } catch (error) {
      return serverError(error)
    }
  }

  async criarBanco(dadosConexao) {
    try {
      let mensagem = null;
      const objetoConexao = { connectionString: this.montarStringConexao(dadosConexao), };
      const cliente = new Client(objetoConexao);

      cliente.connect();
      await this.criarUsuario(cliente);
      /* Criação do banco de dados */
      cliente.query("SELECT datname FROM pg_database", (err1, res1) => {
        let bd = res1.rows.filter((banco) => banco.datname == "carp");
        if (bd.length > 0) {
          mensagem = `Banco já existe. Saindo da criação de banco de dados.`;
          console.log(mensagem);
          cliente.end();
          return ok(mensagem);
        }

        const criarBanco = `CREATE DATABASE carp WITH OWNER = carp ENCODING = 'UTF8' CONNECTION LIMIT = -1`;

        cliente.query(criarBanco, (errdb, db) => {
          console.log('Criando banco...')
          cliente.end()
          console.log('Criação de banco concluída!')
        })
      })

      /* Criação do schema do banco 
      CREATE SCHEMA carp AUTHORIZATION carp;
      GRANT ALL ON SCHEMA carp TO carp;
      ALTER DEFAULT PRIVILEGES IN SCHEMA carp GRANT ALL ON TABLES TO carp;

      */
      cliente.query("select schema_name from information_schema.schemata", (err1, res1) => {
        let bd = res1.rows.filter((banco) => banco.schema_name == "carp")
        if (bd.length > 0) {
          mensagem = 'Schema do banco já existe. Saindo da criação de schema.'
          console.log(mensagem)
          cliente.end()
          return ok(mensagem)
        }

        const criarSchema =
          "CREATE SCHEMA carp AUTHORIZATION carp"

        cliente.query(criarSchema, (errdb, db) => {
          console.log('Criando Schema...')
          cliente.end()
          console.log('Criação de schema concluída!')
        })

        cliente.query('GRANT ALL ON SCHEMA carp TO carp', (errdb, db) => {
          console.log('Privilegios para o Schema...')
          cliente.end()
        })
        cliente.query('ALTER DEFAULT PRIVILEGES IN SCHEMA carp GRANT ALL ON TABLES TO carp', (errdb, db) => {
          console.log('Privilegios para o Schema...')
          cliente.end()
        })

      })
      return ok('Criação do banco concluída!')
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = () => MainController
