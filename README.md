# 📌 Rede Social (Back end)

![Badge de Status](https://img.shields.io/badge/status-EM%20DESENVOLVIMENTO-orange)

Back End da aplicação rede social. Projeto desenvolvido como laboratório de estudos para aplicar novos conceitos e boas práticas de arquitetura e engenharia de software.


## 📚 Estudos Implementados

- [✅] Implementacao de arquitetura limpa (Clean Code)
- [✅] Arquiteturação de banco de dados SQL 
- [✅] Injeção de dependencia
- [✅] Docker
- [🔄️] Testes automatizados


## ⚙️ Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- 🔹 [Node JS](#)
- 🔹 [Typescript](#)
- 🔹 [Postgres](#)
- 🔹 [Prisma](#)
- 🔹 [JWT](#)
- 🔹 [Multer](#)
- 🔹 [Jest](#)


## 🛠️ Instalação e Configuração
### 📌 Pré-requisitos
Antes de começar, certifique-se de ter instalado:

Node.js (versão 23+)

PostgreSQL (ou use o Docker)

Docker e Docker Compose (opcional, para ambiente isolado)

#### 📥 Clone o repositório

```bash
git clone https://github.com/CamposLeo95/projeto_back_post.git
cd projeto_back_post
```

#### 📦 Instale as dependências

```bash
npm install
```

#### 🎲 Crie o banco de dados

Crie o banco de dados e configure as tabelas em SQL de acordo com o arquivo 

```bash
projeto/
│-- 📂SQL/
│   ├── create_tables.sql
```


#### 🔧 Configuração do Ambiente

```bash
DATABASE_URL=
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
GOOGLE_APPLICATION_CREDENTIALS=
PORT=
JWT_SECRET=
```
## 🚀 Como Executar o Projeto

#### 🔥 Rodando em Desenvolvimento
```bash
npx prisma db pull && npx prisma generate && npm run dev
```
#### 🐳 Rodando com Docker
```bash
docker-compose up --build
```

## 🧪 Testes
Para rodar os testes, utilize:
```bash
npm run test
```

## 📌 Rotas e Endpoints

### 🏷️ Autenticação
| Método | Rota             | Descrição           | Type-data       | Data              |
|--------|------------------|---------------------|-----------------|-------------------|
| POST   | `/auth`          | Autenticação        | JSON            |  email / password |

### 📝 Users
| Método | Rota             | Descrição            | Type-data       | Data              |
|--------|------------------|----------------------|-----------------|-------------------|
| POST   | `/users`         | Criar usuarios       | FormData        |  name / email / password / admin / perfil(file) cover(file) / bio |          
| PUT    | `/users/userId`  | Atualizar usuarios   | FormData        |  name / email / password / admin / perfil(file) cover(file) / bio |          
| GET    | `/users`         | Buscar usuarios      | -               | -                 |          
| GET    | `/users/userId`  | Buscar usuario por ID| -               | -                 |     
| DEL    | `/users/userId`  | Deletar usuario      | -               | -                 |               

### 📝 Posts
| Método | Rota             | Descrição           | Type-data       | Data              |
|--------|------------------|---------------------|-----------------|-------------------|
| POST   | `/posts`         | Criar post       | FormData        |  content / image(file) |          
| DEL    | `/posts/idPost`  | Deletar post      | -               |-                 |            
| GET    | `/posts`         | Buscar posts      | -               | -                 |          
| GET    | `/posts/idPost`  | Buscar posts por ID| -               | -                 |     
| GET    | `/posts/me`      | Buscar posts do usuario logado     | -               | -                 |    
| GET    | `/posts/user/12`  |  Buscar posts por usuario    | -               | -                 |    

### 📝 Comments
| Método | Rota             | Descrição           | Type-data       | Data              |
|--------|------------------|---------------------|-----------------|-------------------|
| POST   | `/auth/login`    | Autenticação        | JSON            |  email / password |          
| POST   | `/auth/login`    | Autenticação        | JSON            |  email / password |    

### 📝 Comments
| Método | Rota               | Descrição           | Type-data       | Data              |
|--------|--------------------|---------------------|-----------------|-------------------|
| POST   | `/posts/idPost/comments`| Criar comentario    | JSON            | content                 |          
| PUT    | `/posts/idPost/comments/id`| Buscar comentario por post | JSON             | content                |   
| DEL    | `/comments/ID`             | Deletar comentario     | -            |                       |          
| GET    | `/posts/84/comments`| Buscar comentarios por post | -               | -                 |       

### 📝 Likes
| Método | Rota                | Descrição             | Type-data       | Data              |
|--------|---------------------|-----------------------|-----------------|-------------------|
| POST   | `/like/posts/postID`| Toggle Post           | -               | -                 |          
| GET    | `/like/posts/postID`| Buscar likes por post | -               | -                 |     



## 📂 Estrutura do Projeto

```bash
projeto/
│-- 📂@types/
│-- 📂node_modules/
│-- 📂prisma/
│-- 📂SQL/
│   ├── 📂app/
│       ├── 📂comment/
│           ├── 📂controllers/
│           ├── 📂dtos/
│           ├── 📂repositories/
│           ├── index.ts
│       ├── 📂auth/
│       ├── 📂like/
│       ├── 📂post/
│       ├── 📂user/
│   ├── 📂domain/
│       ├── 📂entities/
│           ├── 📂comment/
│           ├── 📂like/
│           ├── 📂user/
│       ├── 📂useCases/
│           ├── 📂comment/
│           ├── 📂auth/
│           ├── 📂like/
│           ├── 📂user/
│   ├── 📂infra/
│       ├── 📂config/
│           ├── 📂gcp/
│           ├── 📂multer/
│       ├── 📂db/
│           ├── 📂prisma/
│               ├── 📂mappers/
│               ├── 📂repositories/
│   ├── 📂middlewares/
│   ├── 📂routes/
│       ├── 📂comment/
│       ├── 📂auth/
│       ├── 📂like/
│       ├── 📂post/
│       ├── 📂user/
│       ├── routes.ts
│   ├── 📂services/
│   ├── 📂shared/
│       ├── 📂exceptions/
│       ├── 📂types/
│       ├── 📂utils/
│   ├── 📂tests/ ("Segue a mesma estrutura do diretório SRC")
│   ├── app.ts
│   ├── server.ts
│-- .dockerignore
│-- .env
│-- .env.example
│-- .gitignore
│-- docker-compose.yml
│-- Dockerfile.dev
│-- Dockerfile.prod
│-- jest.config.js
│-- package.json
│-- package-lock.json
│-- README.md
│-- tsconfig.json
```