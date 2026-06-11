 API Catálogo de Produtos

Projetinho pra praticar Node.js + Express + MongoDB usando o padrão MVC, autenticação JWT, bcrypt e CRUD de produtos com atributos dinâmicos.

-> O que o projeto faz
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
- **Documentação interativa da API com Swagger UI**

->Documentação da API (Swagger)
A documentação completa de todos os endpoints está disponível de forma interativa em:
-> **[http://localhost:3000/api](http://localhost:3000/api)** (após rodar o servidor)
A documentação cobre todas as rotas da API: autenticação (`/api/auth/*`) e produtos (`/api/produtos/*`), incluindo rotas públicas e protegidas.

-> Como rodar

No terminal:

cd api-catalogo-produtos
npm install
npm run dev
