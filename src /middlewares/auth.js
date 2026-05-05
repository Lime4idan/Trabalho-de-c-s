const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ mensagem: "Token nao fornecido" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = { id: payload.id };

    return next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Token invalido ou expirado" });
  }
}

module.exports = auth;
