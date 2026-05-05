const { validationResult } = require("express-validator");

function validation(req, res, next) {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({
      mensagem: "Dados invalidos",
      erros: erros.array()
    });
  }

  return next();
}

module.exports = validation;
