# Carp

API para controle de clientes, usuários, funcionários, produtos, geração de orçamentos e ordens de serviços.

## Índice

- [Carp](#carp)
  - [Índice](#índice)
  - [Iniciando](#iniciando)
    - [Pré-rquisito](#pré-rquisito)
    - [Variáveis de ambiente](#variáveis-de-ambiente)
    - [Executando](#executando)
    - [Banco de dados](#banco-de-dados)
    - [Migrations](#migrations)
    - [Utilização](#utilização)
      - [Paginação](#Paginação)
      - [Pessoa](#pessoa)
        - [Recursos](#recursos)
        - [Exemplo JSON](#exemplo-json)
      - [Usuário](#usuário)
        - [Recursos](#recursos-1)
        - [Exemplo JSON](#exemplo-json-1)
  - [Dúvidas](#dúvidas)

## Iniciando

Segue as instruções de utilização da API.

[Voltar ao Índice](#índice)

### Pré-rquisito

Ter os programas abaixo já instalados e rodando:

1. Ter o **NodeJs**.
2. Ter o **SGBD (Sistema de Gestão de Banco de Dados) Postgres**.
3. Saber o usuário e senha padrão do Postgres.
4. [sequelize-cli](https://www.npmjs.com/package/sequelize-cli).
5. [postman](https://www.postman.com/)

[Voltar ao Índice](#índice)

### Variáveis de ambiente
**EXTREMAMENTE IMPORTANTE**

Para que funcione em modo de desenvolvimento devé-se crie um arquivo **.env** na raiz da aplicação com algumas variáveis configuradas.

Veja o conteúdo do arquivo [.env.example](https://github.com/jairmaiag/carp/blob/master/.env.example) que contem as variáveis utilizadas no sistema.

[Voltar ao Índice](#índice)

### Executando

Após baixar os fontes acesse a pasta da aplicação e execute o comando:

`npm install`

Utilize o **npm** para executar o mesmo com um dos comandos abaixo:

1. npm start
2. npm run nodemon

Na segunda opção, o **nodemon** deverá está instalado. Para isso use o comando:

```
npm i nodemon -g
```

Ao executar será exibido, no conole, as mensagens:

```
Servidor online na port: 80
Acesse http://localhost
Para criar o banco acesse http://localhost/criarbanco e siga as instruções.
```

[Voltar ao Índice](#índice)

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

[Voltar ao Índice](#índice)

### Migrations

Já com o banco criado vamos criar o schema e as tabelas do sistema.
Pare a aplicação, acesse a pasta da mesma e execute o comando

```
sequelize-cli db:migrate
```

Para desfazer a Migrations (remover o schema e as tabelas).
Isso não remove o banco de dados.

```
sequelize-cli db:migrate:undo:all
```

[Voltar ao Índice](#índice)

### Utilização

Para utilizar a API, deve ser utilizado o programa [postman](https://www.postman.com/) para envio das requisições.

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


[Voltar ao Índice](#índice)

#### Pessoa

O sistema utiliza uma tabela de pessoa para dados gerais de uma pessoa.

##### Recursos

Abaixo uma lista com os recursos e seus métodos:

1. Listagem [http://localhost/pessoa](http://localhost/pessoa), usando GET.
2. Dados de uma pessoa [http://localhost/pessoa/UUId](http://localhost/pessoa/UUId) usando GET, onde o **UUId** é o número de UUId da pessoa na tabela.
3. Cadastrar [http://localhost/pessoa](http://localhost/pessoa) usando POST, passando no corpo da requisição um JSON como do exemplo do final da lista.
4. Alterar [http://localhost/pessoa](http://localhost/pessoa) usando PUT, passando no corpo da requisição um JSON como do exemplo do final da lista.
5. Excluir [http://localhost/pessoa/UUId](http://localhost/pessoa/UUId) usando DELETE, onde o **UUId** é o número de UUId da pessoa na tabela.

[Voltar ao Índice](#índice)

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

Voltar ao [Índice](#índice)

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

[Voltar ao Índice](#índice)

## Dúvidas

Em caso de dúvidas entre em contato com [jairmaiag@gmail.com](jairmaiag@gmail.com)

[Voltar ao Índice](#índice)
