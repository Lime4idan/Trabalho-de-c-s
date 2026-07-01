const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/health", (req, res) => {
  res.status(200).json({ mensagem: "API online" });
});

app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/pedidos", pedidoRoutes);

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota nao encontrada" });
});

app.use(errorHandler);

module.exports = app;
