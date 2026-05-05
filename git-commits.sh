#!/usr/bin/env bash

set -e

echo "1) git init -> cria um repositorio Git local vazio"
git init

echo "2) git add ... -> adiciona arquivos para o primeiro commit"
git add .gitignore package.json .env.example README.md src/config/db.js src/models/User.js

echo "3) git commit -> registra a estrutura inicial"
git commit -m "chore: estrutura inicial do projeto com configuração do banco e model de usuário"

echo "4) git checkout -b develop -> cria branch de integracao"
git checkout -b develop
echo "5) git checkout -b feature/auth -> cria branch da funcionalidade de autenticacao"
git checkout -b feature/auth
git add src/controllers/authController.js src/routes/authRoutes.js src/middlewares/auth.js src/utils/gerarToken.js
git commit -m "feat: implementa registro e login com JWT e bcrypt"
git checkout develop
git merge feature/auth --no-ff -m "merge: feature/auth para develop"

echo "6) feature/crud-produtos -> branch para CRUD protegido"
git checkout -b feature/crud-produtos
git add src/models/Produto.js src/controllers/produtoController.js src/routes/produtoRoutes.js
git commit -m "feat: CRUD de produtos com autenticação e relação usuário-produto"
git checkout develop
git merge feature/crud-produtos --no-ff -m "merge: feature/crud-produtos para develop"

echo "7) feature/validacao-seguranca -> branch para validacao e sanitizacao"
git checkout -b feature/validacao-seguranca
git add src/middlewares/validation.js src/controllers/authController.js src/controllers/produtoController.js
git commit -m "feat: adiciona validação e sanitização de entradas contra NoSQL injection"
git checkout develop
git merge feature/validacao-seguranca --no-ff -m "merge: feature/validacao-seguranca para develop"

echo "8) merge final e tag de versao"
git checkout main
git merge develop --no-ff -m "release: versão inicial completa"
git tag -a v1.0.0 -m "API completa com autenticação, CRUD e segurança"

echo "Fluxo concluido. Agora configure o remote e faca o push."
