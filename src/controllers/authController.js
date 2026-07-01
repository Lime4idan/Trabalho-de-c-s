const crypto = require("crypto");
const usuarioModel = require("../models/usuarioModel");
const gerarToken = require("../utils/gerarToken");

function md5(texto) {
  return crypto.createHash("md5").update(texto).digest("hex");
}

exports.login = async (req, res, next) => {
  try {
    const { nick, senha } = req.body;

    const usuario = await usuarioModel.buscarPorNick(nick);
    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais invalidas" });
    }

    const senhaHash = md5(senha);
    if (senhaHash !== usuario.senha) {
      return res.status(401).json({ mensagem: "Credenciais invalidas" });
    }

    const token = gerarToken(usuario.id_usuario, usuario.nick);
    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nick: usuario.nick
      }
    });
  } catch (error) {
    return next(error);
  }
};
