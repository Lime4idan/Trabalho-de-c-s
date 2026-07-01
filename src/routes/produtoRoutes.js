const express = require("express");
const { body, param } = require("express-validator");
const produtoController = require("../controllers/produtoController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const router = express.Router();

router.use(auth);

const validarId = [
  param("id").isInt({ min: 1 }).withMessage("ID invalido"),
  validation
];

const validarCriacao = [
  body("nome").trim().notEmpty().withMessage("Nome e obrigatorio"),
  body("valor").isFloat({ min: 0 }).withMessage("Valor deve ser um numero >= 0"),
  body("estoque").isInt({ min: 0 }).withMessage("Estoque deve ser um inteiro >= 0"),
  body("categorias_id_categoria")
    .isInt({ min: 1 })
    .withMessage("categorias_id_categoria e obrigatorio"),
  validation
];

const validarAtualizacao = [
  body("nome").optional().trim().notEmpty().withMessage("Nome nao pode ser vazio"),
  body("valor").optional().isFloat({ min: 0 }).withMessage("Valor deve ser um numero >= 0"),
  body("estoque").optional().isInt({ min: 0 }).withMessage("Estoque deve ser um inteiro >= 0"),
  body("categorias_id_categoria")
    .optional()
    .isInt({ min: 1 })
    .withMessage("categorias_id_categoria invalido"),
  validation
];

router.post("/", validarCriacao, produtoController.criar);
router.get("/", produtoController.listar);
router.get("/:id", validarId, produtoController.buscarPorId);
router.put("/:id", validarId, validarAtualizacao, produtoController.atualizar);
router.delete("/:id", validarId, produtoController.deletar);

module.exports = router;
