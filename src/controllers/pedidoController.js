const pedidoModel = require("../models/pedidoModel");

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

    const { data, clientes_id_cliente, itens } = req.body;

    if (!Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ mensagem: "Pedido deve conter ao menos um item" });
    }

    const pedido = await pedidoModel.criar({ data, clientes_id_cliente, itens });
    return res.status(201).json(pedido);
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ mensagem: "Cliente ou produto informado nao existe" });
    }
    return next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const pedidos = await pedidoModel.listarTodos();
    return res.status(200).json(pedidos);
  } catch (error) {
    return next(error);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const pedido = await pedidoModel.buscarPorId(req.params.id);
    if (!pedido) {
      return res.status(404).json({ mensagem: "Pedido nao encontrado" });
    }

    return res.status(200).json(pedido);
  } catch (error) {
    return next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const pedido = await pedidoModel.atualizar(req.params.id, req.body);
    if (!pedido) {
      return res.status(404).json({ mensagem: "Pedido nao encontrado" });
    }

    return res.status(200).json(pedido);
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ mensagem: "Cliente informado nao existe" });
    }
    return next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    if (!exigirUsuario(req, res)) return;

    const removido = await pedidoModel.deletar(req.params.id);
    if (!removido) {
      return res.status(404).json({ mensagem: "Pedido nao encontrado" });
    }

    return res.status(200).json({ mensagem: "Pedido removido com sucesso" });
  } catch (error) {
    return next(error);
  }
};
