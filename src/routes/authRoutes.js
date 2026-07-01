const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const validation = require("../middlewares/validation");

const router = express.Router();

router.post(
  "/login",
  [
    body("nick").trim().notEmpty().withMessage("Nick e obrigatorio"),
    body("senha").notEmpty().withMessage("Senha e obrigatoria"),
    validation
  ],
  authController.login
);

module.exports = router;
