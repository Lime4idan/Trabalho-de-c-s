const jwt = require("jsonwebtoken");

function gerarToken(idUsuario, nick) {
  return jwt.sign({ id_usuario: idUsuario, nick }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });
}

module.exports = gerarToken;
