const bcrypt = require("bcryptjs");
const User = require("../models/User");
const gerarToken = require("../utils/gerarToken");

exports.register = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: "Email ja cadastrado" });
    }

    // O hash protege a senha mesmo se houver vazamento no banco.
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const usuario = await User.create({
      name: nome,
      email,
      password: senhaCriptografada
    });

    const token = gerarToken(usuario._id);
    return res.status(201).json({
      mensagem: "Usuario registrado com sucesso",
      token
    });
  } catch (error) {
    // Em operacoes assincronas, try/catch captura erros de banco e criptografia.
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email }).select("+password");
    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais invalidas" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.password);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Credenciais invalidas" });
    }

    const token = gerarToken(usuario._id);
    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token
    });
  } catch (error) {
    return next(error);
  }
};

