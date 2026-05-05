const jwt = require("jsonwebtoken");

function gerarToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });
}

module.exports = gerarToken;
