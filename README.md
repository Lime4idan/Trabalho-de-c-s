# API Loja — Node.js + Express + MySQL

API REST para gerenciamento de loja (categorias, produtos, clientes e pedidos), migrada de MongoDB para MySQL com `mysql2`, prepared statements e autenticação JWT.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior recomendado)
- [MySQL](https://www.mysql.com/) (8.x recomendado)
- npm

## Instalação

```bash
npm install
```

As dependências incluem `mysql2`. O projeto **não utiliza mais** `mongoose` nem `mongodb`.

Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais MySQL e a chave JWT.

## Configuração do banco de dados

Crie o banco `loja` e as tabelas usando uma das opções abaixo.

### Opção 1 — Importar o dump manualmente

Com o MySQL em execução, importe o arquivo com dados de exemplo:

```bash
mysql -u root -p < Dump20260622.sql
```

Ou importe apenas a estrutura (sem dados):

```bash
mysql -u root -p < loja.sql
```

Também é possível usar ferramentas gráficas (MySQL Workbench, DBeaver, etc.) para executar o arquivo SQL.

### Opção 2 — Script automatizado

Coloque `Dump20260622.sql` ou `loja.sql` na raiz do projeto e execute:

```bash
npm run db:setup
```

O script cria o banco `loja` (se não existir), executa o dump e popula as tabelas quando o arquivo contiver INSERTs.

Para escolher um arquivo específico, defina no `.env`:

```env
SQL_FILE=Dump20260622.sql
```

## Variáveis de ambiente

| Variável        | Descrição                          | Exemplo              |
|-----------------|------------------------------------|----------------------|
| `PORT`          | Porta do servidor                  | `3000`               |
| `DB_HOST`       | Host do MySQL                      | `localhost`          |
| `DB_USER`       | Usuário do MySQL                   | `root`               |
| `DB_PASSWORD`   | Senha do MySQL                     | `sua_senha`          |
| `DB_NAME`       | Nome do banco                      | `loja`               |
| `DB_PORT`       | Porta do MySQL                     | `3306`               |
| `JWT_SECRET`    | Chave secreta para assinar tokens  | `chave_segura`       |
| `JWT_EXPIRES_IN`| Expiração do token JWT             | `1d`                 |
| `SQL_FILE`      | (Opcional) Arquivo SQL do setup    | `Dump20260622.sql`   |

## Execução

Desenvolvimento (com reload):

```bash
npm run dev
```

Produção:

```bash
npm start
```

A API ficará disponível em `http://localhost:3000`.

Documentação Swagger (se configurada): `http://localhost:3000/api-docs`

## Autenticação

A maioria dos endpoints exige um token JWT no header:

```
Authorization: Bearer <token>
```

### Obter o token

```http
POST /api/auth/login
Content-Type: application/json

{
  "nick": "seu_nick",
  "senha": "sua_senha"
}
```

A senha no banco está em **MD5**. O login compara `md5(senha_digitada)` com o valor armazenado na tabela `usuarios`.

Exemplo com os dados do dump (`nick`: `candido`):

Resposta de sucesso:

```json
{
  "mensagem": "Login realizado com sucesso",
  "token": "eyJhbG...",
  "usuario": {
    "id_usuario": 1,
    "nick": "admin"
  }
}
```

O token contém `id_usuario` e `nick`. Use-o em todas as rotas protegidas.

## Endpoints principais

### Públicos

| Método | Rota           | Descrição                    |
|--------|----------------|------------------------------|
| GET    | `/api/status`  | Versão e status da API       |
| POST   | `/api/auth/login` | Login (nick + senha)      |

### Protegidos (requerem JWT)

#### Categorias — `/api/categorias`

| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| POST   | `/`               | Criar categoria        |
| GET    | `/`               | Listar todas           |
| GET    | `/:id`            | Buscar por ID          |
| PUT    | `/:id`            | Atualizar              |
| DELETE | `/:id`            | Remover                |

#### Produtos — `/api/produtos`

| Método | Rota              | Descrição                              |
|--------|-------------------|----------------------------------------|
| POST   | `/`               | Criar produto                          |
| GET    | `/`               | Listar todos (com nome da categoria)   |
| GET    | `/:id`            | Buscar por ID                          |
| PUT    | `/:id`            | Atualizar                              |
| DELETE | `/:id`            | Remover                                |

Corpo de criação:

```json
{
  "nome": "Camiseta",
  "valor": 49.90,
  "estoque": 100,
  "categorias_id_categoria": 1
}
```

#### Clientes — `/api/clientes`

| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| POST   | `/`               | Criar cliente          |
| GET    | `/`               | Listar todos           |
| GET    | `/:id`            | Buscar por ID          |
| PUT    | `/:id`            | Atualizar              |
| DELETE | `/:id`            | Remover                |

Campo `status`: `bom`, `medio` ou `ruim`.

#### Pedidos — `/api/pedidos`

| Método | Rota              | Descrição                          |
|--------|-------------------|------------------------------------|
| POST   | `/`               | Criar pedido com itens             |
| GET    | `/`               | Listar pedidos com itens           |
| GET    | `/:id`            | Buscar pedido com itens            |
| PUT    | `/:id`            | Atualizar data e/ou cliente        |
| DELETE | `/:id`            | Remover pedido e itens             |

Corpo de criação:

```json
{
  "data": "2026-06-22",
  "clientes_id_cliente": 1,
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 2,
      "valor": 49.90
    }
  ]
}
```

## Estrutura do projeto

```
src/
├── config/database.js      # Pool MySQL (mysql2/promise)
├── controllers/            # Lógica das rotas
├── middlewares/auth.js     # Validação JWT
├── models/                 # Queries SQL com prepared statements
├── routes/                 # Definição das rotas
├── app.js
└── server.js
scripts/
└── setupDatabase.js        # Setup do banco via npm run db:setup
```

## Tabelas

- `usuarios` — autenticação (nick, senha MD5)
- `categorias` — categorias de produtos
- `produtos` — produtos com estoque e categoria
- `clientes` — clientes com status
- `endereco` — endereços dos clientes
- `pedidos` — pedidos vinculados a clientes
- `produtos_pedidos` — itens de cada pedido
