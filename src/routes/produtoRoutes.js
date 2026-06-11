const express = require("express");
const { body, param } = require("express-validator");
const produtoController = require("../controllers/produtoController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const router = express.Router();

const validarId = [
  param("id").isMongoId().withMessage("ID de produto invalido"),
  validation
];

const validarCriacaoProduto = [
  body("nome").trim().notEmpty().withMessage("Nome e obrigatorio"),
  body("preco")
    .isFloat({ min: 0 })
    .withMessage("Preco deve ser um numero maior ou igual a zero"),
  body("descricao").optional().trim(),
  body("categoria").trim().notEmpty().withMessage("Categoria e obrigatoria"),
  body("atributosDinamicos")
    .optional()
    .isObject()
    .withMessage("atributosDinamicos deve ser um objeto"),
  validation
];

const validarAtualizacaoProduto = [
  body("nome").optional().trim().notEmpty().withMessage("Nome nao pode ser vazio"),
  body("preco")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Preco deve ser um numero maior ou igual a zero"),
  body("descricao").optional().trim(),
  body("categoria")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Categoria nao pode ser vazia"),
  body("atributosDinamicos")
    .optional()
    .isObject()
    .withMessage("atributosDinamicos deve ser um objeto"),
  validation
];

// Rota pública – não precisa de autenticação

/**
 * @swagger
 * /api/produtos/todos:
 *   get:
 *     summary: Lista todos os produtos de todos os usuários (público)
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos com dados do criador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   preco:
 *                     type: number
 *                   categoria:
 *                     type: string
 *                   criadoPor:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       500:
 *         description: Erro interno
 */
router.get('/todos', produtoController.listarTodosProdutos);

// ==================== ROTAS PROTEGIDAS (token JWT) ====================
router.use(auth);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *               - categoria
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *               atributosDinamicos:
 *                 type: object
 *     responses:
 *       201:
 *         description: Produto criado
 *       400:
 *         description: Dados inválidos
 */
router.post("/", validarCriacaoProduto, produtoController.criarProduto);

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista produtos do usuário autenticado
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get("/", produtoController.listarProdutos);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Busca um produto específico do usuário autenticado por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto (formato MongoDB)
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", validarId, produtoController.buscarProdutoPorId);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto do usuário autenticado
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *               atributosDinamicos:
 *                 type: object
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: ID ou dados inválidos
 *       404:
 *         description: Produto não encontrado
 *       401:
 *         description: Token inválido
 */
router.put("/:id", validarId, validarAtualizacaoProduto, produtoController.atualizarProduto);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Remove um produto do usuário autenticado
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", validarId, produtoController.deletarProduto);

module.exports = router;