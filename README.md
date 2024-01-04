# Postes - BackEnd

Este é a parte backend de um projeto desenvolvido baseado em um mural de comunicados. Visando implementar um sistema que permita a criação de usuarios administrativos ou não, que com base em seus respectivos acessos podem criar, alterar ou até mesmo deletar um poste.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o projeto](#executando-o-projeto)
- [Endpoints/API](#endpointsapi)

## Requisitos

- [x] node - 18.16.0
- [x] npm - 9.5.1
- [x] Prisma - 5.7.1
- [x] Projeto FrontEnd configurado ou testador de rotas


## Instalação 

Faça o clone do repositório 

```bash
git clone https://github.com/CamposLeo95/projeto_back_post.git

```

Depois acesse a a pasta atraves do prompt 

```bash
cd projeto_back_post

```
E rode o comando yarn para instalar as dependencias 

```bash
yarn 

```

Em seguida rode os comando yarn add @prisma/client e npx prisma generate

```bash
yarn add @prisma/client 

npx prisma generate

```

## Executando o projeto

Para executar o projeto é necessario que você esteja dentro da pasta e utilize o comando yarn dev, isso iniciará o servidor


```bash
yarn dev

```

Caso necessite outro comando ou atualização de arquivos verifique arquivo é indicado pelo erro


## Desafios

- O primeiro desafio foi o ponto para fazer a conexão com o banco de dados e poder unir o banco de users com o de postes e para isso utilizei o prisma, um ORM que facilita a interação com bancos de dados.

- Outro desafio foi a autenticação de usuarios para permitir somente tivessem acesso a rota de postes usuarios que possuissem um token e para isso utilizei JWT que permite a manipulação de tokens de uma forma mais pratica.

- Mais um ponto foi trabalhar com Orientação a objetos visto que é uma dos modos de trabalhar mais utilizados no mercado optei por implementa-lo no projeto e poder aprender um pouco mais.

- Fazer a criptografia das senhas dos usuarios para poder registrar no banco de dados e com isso manter uma maior segurança da aplicação, para isso usei o bcrypt.

## Endpoints/API

### User


Rotas users usadas para tratarmos de um usuario em nosso sistema.

```javaScript

// Busca todos os usuarios
routes.get('/users', userController.list.bind(userController))

// Busca um unico usuario
routes.get('/users/:id', userController.findUser.bind(userController))

// Cria um usuario
routes.post('/users', userController.create.bind(userController))

//Atualiza um usuario
routes.put('/users/:id', userController.update.bind(userController))

//Deleta um usuario
routes.delete('/users/:id', userController.delete.bind(userController))

```

------

### Login

 Rota usada para usuario efetuar um login.

```javaScript

// Rota para usuario efetuar o login e receber um token
routes.post('/login', login)

```

------

### posts

 Rotas são usadas para cadastrar, visualizar ou editar uma categoria. (Necessario Token para acessar)

```javaScript
// Dados para cadastrar um poste (POST) - User precisa ter um token
routes.post('/posts', verifyToken, postController.create.bind(postController))

//Não é necessario enviar dados apenas acessar a rota (GET)
routes.get('/posts', verifyToken, postController.list.bind(postController))

// Dados para atualizar um poste (PUT) - User precisa ter um token
routes.put('/posts/:id', verifyToken, postController.update.bind(postController))

// Dados para deletar um poste (DELETE) - User precisa ter um token
routes.delete('/posts/:id', verifyToken, postController.delete.bind(postController))
```


------
