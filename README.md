# Carp

API para controle de clientes, usuários, funcionários, produtos, geração de orçamentos e ordens de serviços.

## Iniciando

Segue as instruções de utilização da API.

### Pré-rquisito
1. Ter o **NodeJs** instalado.
2. Ter o **SGBD (Sistema de Gestão de Banco de Dados) Postgres** instalado e rodando.
3. Saber o usuário e senha padrão do Postgres.

### Executando

Após baixar os fontes utilize o nodejs para executar o mesmo com um dos comandos abaixo:
1. Acesse a pasta da aplicação e execute```npm install```
2. npm start
3. npm run nodemon

Na segunda opção o **nodemon** deverá está instalado. Para isso use o comando:

```
npm i nodemon -g
```
Quando executar será exibido, no conole, as mensagens:
```
Servidor online na port: 80
Acesse http://localhost
Para criar o banco acesse http://localhost/criarbanco e siga as instruções.
```
### Banco de dados
Com a aplicação rodando acesse o endereço [http://localhost/criarbanco](http://localhost/criarbanco)
```
{
"host":"enderecoBanco",
"porta":5432,
"banco":"postgres",
"usuario":"postgres",
"senha":"senhaBanco"
}
```
Para executar todas as Migrations
sequelize-cli db:migrate

Para desfazer a Migrations
sequelize-cli db:migrate:undo:all
