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
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Dados inválidos
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

