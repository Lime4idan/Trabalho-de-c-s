const express = require("express");
const { body, param } = require("express-validator");
const categoriaController = require("../controllers/categoriaController");
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
  validation
];

const validarAtualizacao = [
  body("nome").trim().notEmpty().withMessage("Nome e obrigatorio"),
  validation
];

router.post("/", validarCriacao, categoriaController.criar);
router.get("/", categoriaController.listar);
router.get("/:id", validarId, categoriaController.buscarPorId);
router.put("/:id", validarId, validarAtualizacao, categoriaController.atualizar);
router.delete("/:id", validarId, categoriaController.deletar);

module.exports = router;
