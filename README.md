API Catálogo de Produtos

Projetinho pra praticar Node.js + Express + MongoDB usando o padrão MVC, autenticação JWT, bcrypt e CRUD de produtos com atributos dinâmicos.

O que o projeto faz

- Cadastro e login de usuários (senha criptografada)
- CRUD completo de produtos (criar, ler, atualizar, deletar)
- Cada produto pertence a um usuário
- Atributos dinâmicos nos produtos (flexibilidade do MongoDB)
- Front-end simples (Bootstrap) para consumir a API:
 - Login e cadastro
 - Lista "Meus Produtos" (com botões editar/excluir)
 - Lista "Todos os Produtos" (com nome do criador)
- Proteção contra NoSQL injection (sanitização manual + validação)
- Middleware de autenticação com JWT

- Como rodar -
No terminal:


cd api-catalogo-produtos
npm install
npm run dev

Depois abre no navegador:

- http://localhost:3000 (front-end)

- Antes de rodar - 
- Crie um arquivo .env na raiz (veja o .env.example):


PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/catalogo_produtos_api
JWT_SECRET=sua_chave_jwt_super_segura
JWT_EXPIRES_IN=1d
- Pode usar MongoDB local ou Atlas (nuvem). Se usar Atlas, substitua a string de conexão.

- Endpoints da API -
  
Autenticação (públicos)

- POST /api/auth/register
Body: { "nome": "...", "email": "...", "senha": "..." }
Retorna: { "mensagem": "...", "token": "..." }

- POST /api/auth/login
Body: { "email": "...", "senha": "..." }
Retorna: { "mensagem": "...", "token": "..." }

Produtos (rotas protegidas – enviar token no header Authorization: Bearer <token>)
 - GET /api/produtos – lista produtos do usuário logado
 - GET /api/produtos/todos – lista todos os produtos (público)
- POST /api/produtos – cria produto
- Body: { "nome": "...", "preco": 0, "categoria": "...", "descricao": "...", "atributosDinamicos": {...} }
- GET /api/produtos/:id – busca produto por ID
- PUT /api/produtos/:id – atualiza produto
- DELETE /api/produtos/:id – deleta produto

- Como está organizado (MVC) -
  
src/
├── config/db.js               # conexão MongoDB
├── models/                    # User.js, Produto.js
├── controllers/               # authController.js, produtoController.js
├── routes/                    # authRoutes.js, produtoRoutes.js
├── middlewares/               # auth.js, validation.js, errorHandler.js
├── utils/gerarToken.js        # geração de JWT
├── app.js                     # configura o Express
└── server.js                  # sobe o servidor

- models/ – define schemas com validações e tipos variados (String, Number, Date, ObjectId, Map para atributos dinâmicos)

- controllers/ – lógica de cada rota (async/await + try/catch)

- routes/ – define URLs e chama os controllers, aplica validações

- middlewares/ – autenticação JWT, validação de entradas, tratamento de erros

- db.js – conecta ao MongoDB usando Mongoose

- Segurança -
- bcryptjs – hash de senhas
- JWT – tokens com expiração
- Sanitização manual – remove $ e . de req.body e req.params (evita NoSQL injection)
- express-validator – valida email, tamanho de senha, tipos numéricos, etc.

- Observação -
O front-end (pasta public/) é só para demonstrar o consumo da API. O foco principal é a API REST.

