const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome e obrigatorio"],
      trim: true,
      minlength: [2, "Nome deve ter no minimo 2 caracteres"],
      maxlength: [80, "Nome deve ter no maximo 80 caracteres"]
    },
    email: {
      type: String,
      required: [true, "Email e obrigatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email invalido"]
    },
    password: {
      type: String,
      required: [true, "Senha e obrigatoria"],
      minlength: [6, "Senha deve ter no minimo 6 caracteres"],
      select: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);

