-> API Catálogo de Produtos

API REST com Node.js, Express, MongoDB, autenticação JWT e front-end em Bootstrap.  
Projeto para demonstrar CRUD, segurança, banco NoSQL e GitFlow.

-> O que o sistema faz

- Cadastro e login de usuários (senha criptografada com bcrypt)
- CRUD completo de produtos (criar, ler, atualizar, deletar)
- Cada produto pertence a um usuário (relacionamento)
- Atributos dinâmicos nos produtos (flexibilidade do MongoDB)
- Front-end simples para consumir a API:
  - Login e cadastro
  - Listagem de **meus produtos** (com botões editar/excluir)
  - Listagem de **todos os produtos** (com nome do criador)
- Proteção contra NoSQL injection (sanitização manual + express-validator)
- Middleware de autenticação com JWT
- Tratamento global de erros

-> Tecnologias

- Node.js + Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- helmet (comentado para desenvolvimento)
- Bootstrap 5 (front-end)
- HTML/CSS/JS puro

-> Como rodar o projeto
-1. Clonar o repositório

->bash
git clone https://github.com/Lime4dian/Trabalho-de-sites-2-.git
cd Trabalho-de-sites-2-