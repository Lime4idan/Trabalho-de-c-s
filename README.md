  API Catálogo de Produtos

API REST com Node.js, MongoDB, autenticação JWT e front-end simples.

   O que o projeto faz

- Cadastro e login de usuários (senha criptografada com bcrypt)
- CRUD completo de produtos (criar, listar, editar, deletar) – apenas para usuários autenticados
- Cada produto tem nome, preço, categoria, descrição e atributos dinâmicos (aproveitando o modelo NoSQL)
- Página web (front-end) para testar todas as funcionalidades
- Endpoint público que lista todos os produtos com nome do criador

   Como rodar

No terminal:

```bash
npm install
npm run dev