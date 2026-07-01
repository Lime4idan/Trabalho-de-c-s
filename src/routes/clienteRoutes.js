const express = require("express");
const { body, param } = require("express-validator");
const clienteController = require("../controllers/clienteController");
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
  body("telefone").trim().notEmpty().withMessage("Telefone e obrigatorio"),
  body("status")
    .optional()
    .isIn(["bom", "medio", "ruim"])
    .withMessage("Status deve ser bom, medio ou ruim"),
  validation
];

const validarAtualizacao = [
  body("nome").optional().trim().notEmpty().withMessage("Nome nao pode ser vazio"),
  body("telefone").optional().trim(),
  body("status")
    .optional()
    .isIn(["bom", "medio", "ruim"])
    .withMessage("Status deve ser bom, medio ou ruim"),
  validation
];

router.post("/", validarCriacao, clienteController.criar);
router.get("/", clienteController.listar);
router.get("/:id", validarId, clienteController.buscarPorId);
router.put("/:id", validarId, validarAtualizacao, clienteController.atualizar);
router.delete("/:id", validarId, clienteController.deletar);

module.exports = router;
