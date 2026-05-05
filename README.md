 API REST - Catalogo de Produtos (Node.js + MongoDB)

Projeto didatico em MVC com autenticacao JWT, senha criptografada com bcrypt e CRUD de produtos protegido.

Objetivo

Demonstrar:
- Persistencia real com MongoDB/Mongoose.
- Seguranca com JWT, bcrypt e sanitizacao anti NoSQL injection.
- Boas praticas com arquitetura MVC, tratamento de erros e versionamento com GitFlow.

Estrutura de pastas

txt
src/
  models/      (User, Produto)
  controllers/ (authController, produtoController)
  routes/      (authRoutes, produtoRoutes)
  middlewares/ (auth.js, validation.js, errorHandler.js)
  config/      (db.js)
  utils/       (gerarToken.js)


1) Como instalar

bash
npm install


## 2) Como configurar o .env

Crie um arquivo `.env` na raiz com base no `.env.example`:

`env
MONGO_URI=mongodb://127.0.0.1:27017/catalogo_produtos_api
JWT_SECRET=sua_chave_jwt_super_segura
JWT_EXPIRES_IN=1d
PORT=3000


 3) Como rodar

bash
npm run dev


Para executar em modo normal:

bash
npm start


4) Endpoints da API

Health Check

#### `GET /health`

**Resposta 200**
```json
{
  "mensagem": "API online"
}
```

 Autenticacao

 `POST /api/auth/register`

**Body**
json
{
  "nome": "Aidan",
  "email": "aidan@email.com",
  "senha": "123456"
}


**Resposta 201**
json
{
  "mensagem": "Usuario registrado com sucesso",
  "token": "jwt..."
}
`

`POST /api/auth/login`

**Body**
json
{
  "email": "aidan@email.com",
  "senha": "123456"
}


**Resposta 200**
json
{
  "mensagem": "Login realizado com sucesso",
  "token": "jwt..."
}


 Produtos (todas as rotas protegidas)

Use no header:
txt
Authorization: Bearer SEU_TOKEN


#### `POST /api/produtos`

**Body**
json
{
  "nome": "Notebook Gamer",
  "preco": 4999.9,
  "descricao": "RTX e 16GB RAM",
  "categoria": "Informatica",
  "atributosDinamicos": {
    "marca": "XYZ",
    "garantiaMeses": 12
  }
}


**Resposta 201**
json
{
  "_id": "65f...",
  "nome": "Notebook Gamer",
  "preco": 4999.9,
  "descricao": "RTX e 16GB RAM",
  "categoria": "Informatica",
  "criadoPor": "65a...",
  "atributosDinamicos": {
    "marca": "XYZ",
    "garantiaMeses": 12
  },
  "createdAt": "2026-04-30T...",
  "updatedAt": "2026-04-30T..."
}


`GET /api/produtos`
Lista somente os produtos do usuario autenticado.

 `GET /api/produtos/:id`
Busca 1 produto apenas se ele pertencer ao usuario autenticado.

 `PUT /api/produtos/:id`
Atualiza apenas se o produto for do usuario autenticado.

 `DELETE /api/produtos/:id`
Remove apenas se o produto for do usuario autenticado.

5) Seguranca aplicada

- `bcryptjs`: armazena senha criptografada (hash).
- `jsonwebtoken`: gera token JWT para autenticar requests.
- Middleware manual `sanitizarNoSql`: remove chaves perigosas (`$`, `.`) de req.body e req.params.
- `express-validator`: valida e sanitiza entradas nas rotas.
- `express-validator`: valida e sanitiza entradas.
- `helmet`: adiciona headers de seguranca.

6) Por que async/await com try/catch?

- `async/await` deixa o codigo assincrono mais legivel em operacoes com banco.
- `try/catch` evita quebrar a API quando ocorre erro (ex: falha no MongoDB) e permite resposta controlada.
- O `errorHandler` centraliza erros para manter padrao de resposta.

