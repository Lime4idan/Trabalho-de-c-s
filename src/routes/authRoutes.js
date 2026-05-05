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

