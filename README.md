# Carp

API para controle de clientes, usuários, funcionários, produtos, geração de orçamentos e ordem de serviços.

## Iniciando

Após baixar o projeto o mesmo deve

### Executando a API

Pode ser utilizado um dos comandos abaixo:

1. npm start
2. npm run nodemon
   Na segunda opção o nodemon deverá está instalado. Para isso use o comando: npm i nodemon -g

Para executar todas as Migrations
sequelize-cli db:migrate

Para desfazer a Migrations
sequelize-cli db:migrate:undo:all
