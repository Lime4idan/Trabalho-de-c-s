const mongoose = require("mongoose");

// Centraliza a conexao com o MongoDB usando a URI do .env.
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error.message);
    throw error;
  }
};

module.exports = conectarDB;

