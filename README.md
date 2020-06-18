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

Para que o funcione em modo de desenvolvimento crie um arquivo **.env** na raiz da aplicação com algumas variáveis configuradas.

Veja o conteúdo do arquivo **.env.example** que contem as variáveis utilizadas no sistema.

[Voltar ao Índice](#índice)

### Executando

Após baixar os fontes acesse a pasta da aplicação e execute o comando:
`npm install`

Utilize o nodejs para executar o mesmo com um dos comandos abaixo:

1. npm start
2. npm run nodemon

Na segunda opção o **nodemon** deverá está instalado. Para isso use o comando:

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

#### Pessoa

O sistema utiliza uma tabela de pessoa para dados gerais de uma pessoa.

##### Recursos

Abaixo uma lista com os recursos e seus métodos:

1. Listagem [http://localhost/pessoa](http://localhost/pessoa), usando GET.
2. Dados de uma pessoa [http://localhost/pessoa/id](http://localhost/pessoa/id) usando GET, onde o **id** é o número de id da pessoa na tabela.
3. Cadastrar [http://localhost/pessoa](http://localhost/pessoa) usando POST, passando no corpo da requisição um JSON como do exemplo do final da lista.
4. Alterar [http://localhost/pessoa](http://localhost/pessoa) usando PUT, passando no corpo da requisição um JSON como do exemplo do final da lista.
5. Excluir [http://localhost/pessoa/id](http://localhost/pessoa/id) usando DELETE, onde o **id** é o número de id da pessoa na tabela.

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
