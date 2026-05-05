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
router.get('/todos', produtoController.listarTodosProdutos);

router.use(auth);
router.post("/", validarCriacaoProduto, produtoController.criarProduto);
router.get("/", produtoController.listarProdutos);
router.get("/:id", validarId, produtoController.buscarProdutoPorId);
router.put("/:id", validarId, validarAtualizacaoProduto, produtoController.atualizarProduto);
router.delete("/:id", validarId, produtoController.deletarProduto);

module.exports = router;
