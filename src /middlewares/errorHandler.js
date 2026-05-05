function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const mensagem = err.message || "Erro interno do servidor";

  if (process.env.NODE_ENV !== "test") {
    console.error("Erro global:", err);
  }

  res.status(statusCode).json({ mensagem });
}

module.exports = errorHandler;
