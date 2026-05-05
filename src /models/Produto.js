const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome e obrigatorio"],
      trim: true,
      minlength: [2, "Nome deve ter no minimo 2 caracteres"]
    },
    preco: {
      type: Number,
      required: [true, "Preco e obrigatorio"],
      min: [0, "Preco nao pode ser negativo"]
    },
    descricao: {
      type: String,
      trim: true,
      default: ""
    },
    categoria: {
      type: String,
      required: [true, "Categoria e obrigatoria"],
      trim: true
    },
    // Guarda o dono do produto para permitir acesso apenas ao proprio recurso.
    criadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // Campo dinamico para reforcar a flexibilidade do modelo NoSQL.
    atributosDinamicos: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Produto", produtoSchema);
