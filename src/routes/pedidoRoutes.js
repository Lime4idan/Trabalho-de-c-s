const express = require("express");
const { body, param } = require("express-validator");
const pedidoController = require("../controllers/pedidoController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const router = express.Router();

router.use(auth);

const validarId = [
  param("id").isInt({ min: 1 }).withMessage("ID invalido"),
  validation
];

const validarItem = body("itens")
  .isArray({ min: 1 })
  .withMessage("Itens deve ser um array com ao menos um elemento");

const validarCriacao = [
  body("data").isISO8601().toDate().withMessage("Data invalida (use YYYY-MM-DD)"),
  body("clientes_id_cliente")
    .isInt({ min: 1 })
    .withMessage("clientes_id_cliente e obrigatorio"),
  validarItem,
  body("itens.*.produto_id")
    .isInt({ min: 1 })
    .withMessage("produto_id e obrigatorio em cada item"),
  body("itens.*.quantidade")
    .isFloat({ min: 0.01 })
    .withMessage("quantidade deve ser um numero > 0"),
  body("itens.*.valor")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("valor deve ser um numero >= 0"),
  body("itens.*.valor_unitario")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("valor_unitario deve ser um numero >= 0"),
  body("itens").custom((itens) => {
    for (const item of itens) {
      const valor = item.valor ?? item.valor_unitario;
      if (valor === undefined || valor === null) {
        throw new Error("Cada item deve informar valor ou valor_unitario");
      }
    }
    return true;
  }),
  validation
];

const validarAtualizacao = [
  body("data").optional().isISO8601().toDate().withMessage("Data invalida"),
  body("clientes_id_cliente")
    .optional()
    .isInt({ min: 1 })
    .withMessage("clientes_id_cliente invalido"),
  validation
];

router.post("/", validarCriacao, pedidoController.criar);
router.get("/", pedidoController.listar);
router.get("/:id", validarId, pedidoController.buscarPorId);
router.put("/:id", validarId, validarAtualizacao, pedidoController.atualizar);
router.delete("/:id", validarId, pedidoController.deletar);

module.exports = router;
