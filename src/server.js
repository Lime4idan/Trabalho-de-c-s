require("dotenv").config();
const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await pool.query("SELECT 1");
    console.log("MySQL conectado com sucesso.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error.message);
    process.exit(1);
  }
}

iniciarServidor();
