var Sequelize = require("sequelize"),
  { Client } = require("pg");
class UcMain {
  constructor(app) {
    this.app = app;
  }
  index(req, res) {
    res.status(200).json({
      mensagem:
        "Sistema GCPS Ativo! Para criação de banco acesse /criarbanco usando o method POST.",
    });
  }
  montarStringConexao(dadosConexaoPadrao) {
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
    );
  }
  async criarBanco(dadosConexaoPadrao) {
    const cliente = new Client({
      connectionString: this.montarStringConexao(dadosConexaoPadrao),
    });
    cliente.connect();
    /* Criação do usuário de acesso ao banco */
    cliente.query("select usename from pg_user;", (errusu, usus) => {
      let usubd = usus.rows.filter((usu) => usu.usename == "carp");
      if (usubd.length > 0) {
        console.log("Usuário de banco já existe. Saindo da criação do usuario.");
        return;
      }
      const criarUsuario =
        "CREATE ROLE carp WITH LOGIN SUPERUSER CREATEDB CREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1 PASSWORD 'carp';";
      cliente.query(criarUsuario, (errusu, usu) => {
        console.log("Criando usuario...");
      });
    });

    /* Criação do banco de dados */
    cliente.query("SELECT datname FROM pg_database;", (err1, res1) => {
      let bd = res1.rows.filter((banco) => banco.datname == "carp");
      if (bd.length > 0) {
        console.log("Banco já existe. Saindo da criação de banco de dados.");
        cliente.end();
        return;
      }
      const criarBanco =
        "CREATE DATABASE carp WITH OWNER = carp ENCODING = 'UTF8' CONNECTION LIMIT = -1;";
      cliente.query(criarBanco, (errdb, db) => {
        console.log("Criando banco...");
        cliente.end();
      });
    });
    return null;
  }
}

function retorno(app) {
  return new UcMain(app);
}

module.exports = function () {
  return retorno;
};
