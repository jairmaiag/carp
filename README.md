# Carp
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?&logo=Visual+Studio+Code&logoColor=FFFFFF&style=flat) ![JavaScript](https://img.shields.io/badge/JavaScript-222222?&logo=JavaScript&logoColor=F7DF1E&style=flat) ![JSON](https://img.shields.io/badge/json-000000?&logo=JSON&logoColor=FFFFFF&style=flat) ![NodeJs](https://img.shields.io/badge/Node.js-339933?&logo=nodedotjs&logoColor=FFFFFF&style=flat) ![NPM](https://img.shields.io/badge/NPM-CB3837?&logo=npm&logoColor=FFFFFF&style=flat) ![Docker](https://img.shields.io/badge/Docker-2496ED?&logo=Docker&logoColor=FFFFFF&style=flat) ![Express](https://img.shields.io/badge/Express-000000?&logo=Express&logoColor=FFFFFF&style=flat) ![Liquibase](https://img.shields.io/badge/Liquibase-2962FF?&logo=Liquibase&logoColor=FFFFFF&style=flat) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?&logo=PostgreSql&logoColor=FFFFFF&style=flat) ![JSON Web Tokens](https://img.shields.io/static/v1?style=flat&message=JSON+Web+Tokens&color=000000&logo=JSON+Web+Tokens&logoColor=FFFFFF&label=)

API para controle de clientes, usuários, funcionários, produtos, geração de orçamentos e ordens de serviços.

## Índice

- [Carp](#carp)
  - [Índice](#índice)
  - [Iniciando](#iniciando)
    - [Pré-requisitos](#pré-requisitos)
    - [Variáveis de ambiente](#variáveis-de-ambiente)
    - [Executando](#executando)
    - [Internacionalização](#internacionalização)
    - [Banco de dados](#banco-de-dados)
    - [Migrations](#migrations)
    - [Seed](#seed)
    - [Utilização](#utilização)
      - [Filtro](#filtro)
      - [Paginação](#paginação)
      - [Pessoa](#pessoa)
        - [Recursos](#recursos)
        - [Exemplo JSON](#exemplo-json)
      - [Usuário](#usuário)
        - [Recursos](#recursos-1)
        - [Exemplo JSON](#exemplo-json-1)
  - [Dúvidas](#dúvidas)

## Iniciando

Segue as instruções de utilização da API.

[Voltar ao Índice](#carp)

### Pré-requisitos

Ter os programas abaixo já instalados e rodando:

1. Ter o **NodeJs** versão **14.15.4** ou superior.
2. Ter o **SGBD (Sistema de Gestão de Banco de Dados) Postgres** versão **14.1** ou superior.
3. Saber o usuário e senha padrão do Postgres.
4. [sequelize-cli](https://www.npmjs.com/package/sequelize-cli).
5. [postman](https://www.postman.com/)

[Voltar ao Índice](#carp)

### Variáveis de ambiente
**EXTREMAMENTE IMPORTANTE**

Para que o projeto, funcione em modo de desenvolvimento, devé-se crie um arquivo **.env** na raiz da aplicação com algumas variáveis configuradas.

Veja o conteúdo do arquivo [.env.example](https://github.com/jairmaiag/carp/blob/master/.env.example) que contem as variáveis utilizadas no sistema.

[Voltar ao Índice](#carp)

### Executando

Após baixar os fontes acesse a pasta da aplicação e execute o comando:

`npm install`

Utilize o **npm** para executar um dos comandos abaixo:

1. `npm start` - Execução de produção.
2. `npm run dev` - Execução de desenvolvimento.

Ao executar será exibido, no conole, as mensagens:

```
Servidor online na port: 80
Acesse http://localhost
Para criar o banco acesse http://localhost/criarbanco e siga as instruções.
```

[Voltar ao Índice](#carp)

### Internacionalização

Para utilizar a internacionalização, deve-se passar o parâmetro ```clang=en-us``` no endereço da requisição.

Exemplo:

http://localhost/perfil?clang=en-us

Assim os alertas e avisos serão em inglês.

[Voltar ao Índice](#carp)

### Banco de dados

Utilizando o [postman](https://www.postman.com/), acesse o endereço [http://localhost/criarbanco](http://localhost/criarbanco).
Utilizando uma requisição POST passando no body da mesma, com o formato JSON as informações abaixo:

```
{
"host":"enderecoBanco",
"porta":5432,
"banco":"postgres",
"usuario":"postgres",
"senha":"senhaBanco"
}
```
Onde:

- host - É o endereço ou IP de acesso ao banco padrão postgres.
- porta - Porta de acesso ao banco (padrão 5432).
- banco - Nome do banco padrão do postgres.
- usuario - Usuário de acesso ao banco com permissão de criar bancos.
- senha - Senha do usuário de acesso ao banco padrão do postgres.

Ao témino será criado um usuário com nome **carp** e um banco, também, de nome **carp**.  
Abaixo a imagem de retorno de uma requisição do tipo POST para criação do banco de dados.  
![Retorno da criação do banco](https://github.com/jairmaiag/carp/blob/master/assets/RetornoCriarBanco.png)


[Voltar ao Índice](#carp)

### Migrations

Já com o banco criado, vamos criar as tabelas do sistema.
Pare a aplicação, acesse a pasta da mesma e execute o comando

```
npx sequelize db:migrate
```

Para desfazer a Migrations (remover as tabelas).  
Isso não remove o banco de dados.

```
npx sequelize db:migrate:undo:all
```

[Voltar ao Índice](#carp)

### Seed

Para semear, popular as tabelas utilize o comando abaixo:

```
npx sequelize db:seed:all
```

Para desfazer o dados inseridos.

```
npx sequelize db:seed:undo:all
```

[Voltar ao Índice](#carp)

### Utilização

Para utilizar a API, deve ser utilizado o programa [postman](https://www.postman.com/) para envio das requisições.

#### Filtro

Para utlização de uma requisião GET para o endereço principal do recurso, é preciso enviar um objeto **filter**, no corpo da requisição, para a mesma. Como Abaixo:

Exemplo: http://localhost:8080/pessoa/
```
{
	"filter":{
		"idPes":1
	}
}
```
[Voltar ao Índice](#carp)
#### Paginação

Para utilizar os registros com paginação inclua a palavra **paginacao** logo após o recurso a ser utilizado.

Exemplo: http://localhost:8080/pessoa/paginacao

Este retornará um objeto JSON como abaixo:
```
{
    "page": {
        "selectPage": "1",
        "amountRecord": "5",
        "fieldName": "id",
        "previousRecord": "",
        "lastRecord": "",
        "previousPage": "0",
        "nextPage": 0,
        "totalRows": 16,
        "totalPages": 4,
        "directionOrder": "ASC"
    },
    "rows": [],
    "order": [
        [
            "id",
            "ASC"
        ]
    ]
}
```
Este objeto JSON possue os campos **page, rows** e **order**.

O campo **page** é um objeto contendo os seguintes campos:
01. selectPage: É a página que se deseja visualizar.
02. amountRecord: Quantidade de registros por página.
03. fieldName: Nome do campo utilizado para ordenação.
04. directionOrder: Direção da ordenação ( ASC ou DESC).
05. previousRecord: Registro anterior, pode ser utilizado para filtros.
06. lastRecord: Último registro da página, pode ser utilizado para filtros.
07. totalRows: Quantidade total de registros na tabela.
08. totalPages: Quantidade total de páginas. Este total depende de **totalRows** e **amountRecord**.
09. previousPage: Número da página anterior.
10. nextPage: Número da próxima página.

O campo **rows** é um array de objetos com os registros retornados.

O campo **order** é um array de arrays com os campos de ordenação. Pode ser incluidos vários campos com sua direção de ordem.

Para utilizar basta enviar o número da página no parâmetro **selectPage** como nos exemplos:

http://localhost:8080/pessoa/paginacao?selectPage=2

http://localhost:8080/pessoa/paginacao?selectPage=3

http://localhost:8080/pessoa/paginacao?selectPage=4

Para passar qual campo será ordenado utilize o parâmetro **fieldName**, também no endereço, como abaixo:

http://localhost:8080/pessoa/paginacao?selectPage=4&fieldName=nome

E assim vale para os outros parâmetros.


[Voltar ao Índice](#carp)

#### Pessoa

O sistema utiliza uma tabela de pessoa para dados gerais de uma pessoa.

##### Recursos

Abaixo uma lista com os recursos e seus métodos:

1. Listagem [http://localhost/pessoa](http://localhost/pessoa), usando GET.
2. Dados de uma pessoa [http://localhost/pessoa/UUId](http://localhost/pessoa/UUId) usando GET, onde o **UUId** é o número de UUId da pessoa na tabela.
3. Cadastrar [http://localhost/pessoa](http://localhost/pessoa) usando POST, passando no corpo da requisição um JSON como do exemplo do final da lista.
4. Alterar [http://localhost/pessoa](http://localhost/pessoa) usando PUT, passando no corpo da requisição um JSON como do exemplo do final da lista.
5. Excluir [http://localhost/pessoa/UUId](http://localhost/pessoa/UUId) usando DELETE, onde o **UUId** é o número de UUId da pessoa na tabela.

[Voltar ao Índice](#carp)

##### Exemplo JSON

Segue um exemplo no formato JSON que será retornado ou enviado pela API. Em caso de cadastro o campo ID não pode ser enviado, o mesmo será gerado automaticamente.
Para um cadastro:

```
{
	"nome": "Fulano",
	"nomemeio": "De",
	"sobrenome": "Tal",
	"nascimento": "1990-01-31",
	"sexo": "M",
	"cpf": null,
	"rg": null
}
```

Para uma alteração:

```
{
	"id": 1
	"nome": "Novo",
	"nomemeio": "Nome",
	"sobrenome": "Tal",
	"nascimento": "1990-01-31",
	"sexo": "M",
	"cpf": 1234567890,
	"rg": null,
    "ativo": false
}
```

Nas listagens:

```
{
    "id": 1,
    "nome": "Nova",
    "nomemeio": "Banco",
    "sobrenome": "Carp",
    "nascimento": "1990-01-31",
    "sexo": "F",
    "cpf": null,
    "rg": null,
    "ativo": true,
    "createdAt": "2020-06-10T12:55:04.771Z",
    "updatedAt": "2020-06-10T12:55:04.771Z",
    "Usuario": null
}
```

Voltar ao [Índice](#carp)

#### Usuário

O sistema utiliza uma tabela de usuario para dados dos usuáiros de acesso ao sistema.

##### Recursos

Segue o mesmo padrão do recurso de [Pessoa](#pessoa), com a diferença de trocar a palavra pessoa por usuario como no exemplo: [http://localhost/usuario](http://localhost/usuario)

##### Exemplo JSON

```
{
    "id": 1,
    "login": "novo",
    "senha": "NovaSenha",
    "ciracao": null,
    "expira": null,
    "ativo": true,
    "idPessoa": 2,
    "createdAt": "2020-06-10T12:55:31.213Z",
    "updatedAt": "2020-06-10T12:55:31.213Z",
    "pesid": 2,
    "Pessoa": {
        "id": 2,
        "nome": "novo",
        "nomemeio": null,
        "sobrenome": null,
        "nascimento": null,
        "sexo": "F",
        "cpf": null,
        "rg": null,
        "ciracao": null,
        "ativo": true,
        "createdAt": "2020-06-10T12:55:31.202Z",
        "updatedAt": "2020-06-10T12:55:31.202Z"
}
```

Segue o mesmo comportamento descrito na explicação de [Pessoa](#pessoa).

[Voltar ao Índice](#carp)

## Dúvidas

Em caso de dúvidas entre em contato com [jairmaiag@gmail.com](jairmaiag@gmail.com)

[Voltar ao Índice](#carp)
