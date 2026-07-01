const clienteModel = require("../models/clienteModel");

function exigirUsuario(req, res) {
  if (!req.usuario?.id_usuario) {
    res.status(401).json({ mensagem: "Usuario nao autenticado" });
    return false;
  }
  return true;
}

exports.criar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const cliente = await clienteModel.criar(req.body);
    return res.status(201).json(cliente);
  } catch (error) {
    return next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const clientes = await clienteModel.listarTodos();
    return res.status(200).json(clientes);
  } catch (error) {
    return next(error);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const cliente = await clienteModel.buscarPorId(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente nao encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    return next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const cliente = await clienteModel.atualizar(req.params.id, req.body);
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente nao encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    return next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const removido = await clienteModel.deletar(req.params.id);
    if (!removido) {
      return res.status(404).json({ mensagem: "Cliente nao encontrado" });
    }

    return res.status(200).json({ mensagem: "Cliente removido com sucesso" });
  } catch (error) {
    return next(error);
  }
};
