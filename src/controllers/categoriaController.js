const categoriaModel = require("../models/categoriaModel");

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

    const { nome } = req.body;
    const categoria = await categoriaModel.criar(nome);
    return res.status(201).json(categoria);
  } catch (error) {
    return next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const categorias = await categoriaModel.listarTodos();
    return res.status(200).json(categorias);
  } catch (error) {
    return next(error);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const categoria = await categoriaModel.buscarPorId(req.params.id);
    if (!categoria) {
      return res.status(404).json({ mensagem: "Categoria nao encontrada" });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    return next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const categoria = await categoriaModel.atualizar(req.params.id, req.body.nome);
    if (!categoria) {
      return res.status(404).json({ mensagem: "Categoria nao encontrada" });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    return next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const removida = await categoriaModel.deletar(req.params.id);
    if (!removida) {
      return res.status(404).json({ mensagem: "Categoria nao encontrada" });
    }

    return res.status(200).json({ mensagem: "Categoria removida com sucesso" });
  } catch (error) {
    return next(error);
  }
};
