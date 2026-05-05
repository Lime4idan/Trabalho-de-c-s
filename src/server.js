require("dotenv").config();
const app = require("./app");
const conectarDB = require("./config/db");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await conectarDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error.message);
    process.exit(1);
  }
}

iniciarServidor();
