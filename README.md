# Postes - BackEnd

Este é a parte backend de um projeto desenvolvido baseado uma rede social. Visando implementar um sistema que permita a criação de usuarios, que podem interagir atraves de postagens, comentarios e curtidas com outros usuários.


## IMPORTANTE!!!
O projeto 

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o projeto](#executando-o-projeto)
- [Endpoints/API](#endpointsapi)

## Requisitos

- [x] node - 23.6.0
- [x] npm - 11.1.0
- [x] Prisma - ^6.3.0
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

Caso tenha docker e docker compose poder utilizar o seguinte comando que ele subirá um container com as imagens do app e do banco

```bash
docker-compose up --build

```
Se nao tiver Docker precisará criar um DB e inserir as variaves globais no .env para fazer conexao com o banco e inicializar o prisma, após rode o comando 


```bash
yarn dev

```

## Desafios

- implementar O Google Cloud para subir imagens utilizando o serviço de storage da cloud.

- Iniciar uma arquitetura mais limpar para poder implementar testes, e utilizar injeçao de dependenciar para poder abstrair mais o codigo.

- Fazer a conexão com o banco de dados e poder unir o banco de users com o de postes e para isso utilizei o prisma.

- Autenticação de usuarios para permitir somente tivessem acesso a rota de postes usuarios que possuissem um token e para isso utilizei JWT que permite a manipulação de tokens de uma forma mais pratica.

- Fazer a criptografia das senhas dos usuarios para poder registrar no banco de dados e com isso manter uma maior segurança da aplicação, para isso usei o bcrypt.


## Endpoints/API

### User

Rotas users usadas para tratarmos de um usuario em nosso sistema.

```javaScript

		routes.get( "/users", userController.findAllUsers.bind(userController));
		routes.get( "/users/:id",	userController.findUsersById.bind(userController));
		routes.post("/users", upload.fields([
				{ name: "perfil", maxCount: 1 },
				{ name: "cover", maxCount: 1 },
			]), serController.create.bind(userController));
		routes.put( "/users/:id", upload.fields([
				{ name: "perfil", maxCount: 1 },
				{ name: "cover", maxCount: 1 },
			]),userController.update.bind(userController));
		routes.delete( "/users/:id",userController.delete.bind(userController));
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

 Rotas são usadas para cadastrar, visualizar, editar oiu deletar um post.

```javaScript


routes.get(	"/posts",	LoginModule.verifyToken.bind(LoginModule),	PostModule.findAll.bind(PostModule));

routes.get("/posts/me",	LoginModule.verifyToken.bind(LoginModule),PostModule.findAllByUserPost.bind(PostModule));

routes.get("/posts/user/:userId", LoginModule.verifyToken.bind(LoginModule), PostModule.findAllByUserPost.bind(PostModule));

routes.get( "/posts/:id", LoginModule.verifyToken.bind(LoginModule), PostModule.findById.bind(PostModule));

routes.post( "/posts", upload.single("image"), LoginModule.verifyToken.bind(LoginModule), PostModule.create.bind(PostModule));

routes.put( "/posts/:id", LoginModule.verifyToken.bind(LoginModule), 	PostModule.update.bind(PostModule));

routes.delete( "/posts/:id", LoginModule.verifyToken.bind(LoginModule), PostModule.delete.bind(PostModule));
```
------

### comments

 Rotas são usadas para cadastrar, visualizar, editar ou deletar um comentario.

```javaScript

routes.get("/posts/:idPost/comments",	LoginModule.verifyToken.bind(LoginModule),CommentModule.findByPostId.bind(CommentModule));

routes.post("/posts/:idPost/comments",LoginModule.verifyToken.bind(LoginModule),CommentModule.create.bind(CommentModule));

routes.put("/posts/:idPost/comments/:id",	LoginModule.verifyToken.bind(LoginModule),	CommentModule.update.bind(CommentModule));

routes.delete("/comments/:id",LoginModule.verifyToken.bind(LoginModule),CommentModule.delete.bind(CommentModule));
```
------

### Like

 Rotas são usadas para cadastrar, visualizar ou editar um comentario.

```javaScript

routes.post("/like/posts/:id", LikeModule.toggleLike.bind(LikeModule));

routes.get("/like/posts/:id", LikeModule.findAllByPostId.bind(LikeModule));

routes.get( "/like/posts/:idPost/user/:idUser", LikeModule.findOnly.bind(LikeModule));
```
------