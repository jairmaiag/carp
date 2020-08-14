const { Client } = require("pg")
const { serverError, ok } = require('../../app/helpers/http/HttpHelpers')

class MainController {

  constructor(app) {
    this.app = app
  }

  index(req, res) {
    try {
      let porta = process.env.PORT == 80 ? "" : ":" + process.env.PORT
      return ok(`Sistema GCPS Ativo! Para criação de banco acesse http://localhsot${porta}/criarbanco usando o method POST.`)
    } catch (error) {
      return serverError(error)
    }
  }

  montarStringConexao(dadosConexaoPadrao) {
    try {
      return (
        "postgres://" +
        dadosConexaoPadrao.usuario +
        ":" +
        dadosConexaoPadrao.senha +
        "@" +
        dadosConexaoPadrao.host +
        ":" +
        dadosConexaoPadrao.porta +
        "/" +
        dadosConexaoPadrao.banco
      )
    } catch (error) {
      return serverError(error)
    }
  }

  async criarBanco(dadosConexao) {
    try {
      let mensagem = null

      const cliente = new Client({
        connectionString: this.montarStringConexao(dadosConexaoPadrao),
      })

      cliente.connect()

      /* Criação do usuário de acesso ao banco */
      cliente.query("select usename from pg_user", (errusu, usus) => {
        let usubd = usus.rows.filter((usu) => usu.usename == "carp")
        if (usubd.length > 0) {
          mensagem = 'Usuário de banco já existe. Saindo da criação do usuario. Aguarde a verificação do banco...'
          console.log(mensagem)
          return ok(mensagem)
        }

        const criarUsuario =
          "CREATE ROLE carp WITH LOGIN SUPERUSER CREATEDB CREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1 PASSWORD 'carp'"

        cliente.query(criarUsuario, (errusu, usu) => {
          console.log('Criando usuario...')
        })
      })

      /* Criação do banco de dados */
      cliente.query("SELECT datname FROM pg_database", (err1, res1) => {
        let bd = res1.rows.filter((banco) => banco.datname == "carp")
        if (bd.length > 0) {
          mensagem = 'Banco já existe. Saindo da criação de banco de dados.'
          console.log(mensagem)
          cliente.end()
          return ok(mensagem)
        }

        const criarBanco =
          "CREATE DATABASE carp WITH OWNER = carp ENCODING = 'UTF8' CONNECTION LIMIT = -1"

        cliente.query(criarBanco, (errdb, db) => {
          console.log('Criando banco...')
          cliente.end()
          console.log('Criação de banco concluída!')
        })
      })

      return ok('Criação do banco concluída!')
    } catch (error) {
      return serverError(error)
    }
  }
}

function retorno(app) {
  return new MainController(app)
}

module.exports = () => retorno
