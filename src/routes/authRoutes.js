const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const validation = require("../middlewares/validation");

const router = express.Router();

router.post(
  "/register",
  [
    body("nome").trim().notEmpty().withMessage("Nome e obrigatorio"),
    body("email").isEmail().withMessage("Email invalido").normalizeEmail(),
    body("senha")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter no minimo 6 caracteres"),
    validation
  ],
  authController.register
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       409:
 *         description: E-mail já cadastrado
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email invalido").normalizeEmail(),
    body("senha").notEmpty().withMessage("Senha e obrigatoria"),
    validation
  ],
  authController.login
);

module.exports = router;

