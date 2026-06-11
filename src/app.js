const express = require("express");
const path = require("path"); 
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

function sanitizarNoSql(entrada) { 
  if (!entrada || typeof entrada !== "object") return;

  for (const chave of Object.keys(entrada)) { // O express-validator (usado nas rotas) já sanitiza e valida entradas.
    // Este middleware extra remove operadores NoSQL ($, .) como camada adicional de segurança.
    if (chave.startsWith("$") || chave.includes(".")) {
      delete entrada[chave];
      continue;
    }

    sanitizarNoSql(entrada[chave]);
  }
}

//app.use(helmet());//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  sanitizarNoSql(req.body);
  sanitizarNoSql(req.params);
  // Em Express 5, req.query pode ser somente leitura.
  // Evita mutacao direta para nao quebrar a request.
  next();
});

app.use(express.static(path.join(__dirname, "../public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/health", (req, res) => {
  res.status(200).json({ mensagem: "API online" });
});

app.use("/api/auth", authRoutes);
app.use("/api/produtos", produtoRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger'); 
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota nao encontrada" });
});

app.use(errorHandler);

module.exports = app;

