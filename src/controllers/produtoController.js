const produtoModel = require("../models/produtoModel");

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

    const produto = await produtoModel.criar(req.body);
    return res.status(201).json(produto);
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ mensagem: "Categoria informada nao existe" });
    }
    return next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const produtos = await produtoModel.listarTodos();
    return res.status(200).json(produtos);
  } catch (error) {
    return next(error);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const produto = await produtoModel.buscarPorId(req.params.id);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const produto = await produtoModel.atualizar(req.params.id, req.body);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    return res.status(200).json(produto);
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ mensagem: "Categoria informada nao existe" });
    }
    return next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const removido = await produtoModel.deletar(req.params.id);
    if (!removido) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    return res.status(200).json({ mensagem: "Produto removido com sucesso" });
  } catch (error) {
    return next(error);
  }
};
