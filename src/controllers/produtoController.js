const mongoose = require("mongoose");
const Produto = require("../models/Produto");

exports.criarProduto = async (req, res, next) => {
  try {
    // async/await deixa o fluxo mais legivel para operacoes de I/O com o banco.
    const novoProduto = await Produto.create({
      ...req.body,
      criadoPor: req.usuario.id
    });

    return res.status(201).json(novoProduto);
  } catch (error) {
    // try/catch impede quebra da aplicacao e delega resposta padronizada ao middleware global.
    return next(error);
  }
};

exports.listarProdutos = async (req, res, next) => {
  try {
    const produtos = await Produto.find({ criadoPor: req.usuario.id }).sort({
      createdAt: -1
    });

    return res.status(200).json(produtos);
  } catch (error) {
    return next(error);
  }
};

exports.buscarProdutoPorId = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensagem: "ID de produto invalido" });
    }

    const produto = await Produto.findOne({
      _id: req.params.id,
      criadoPor: req.usuario.id
    });

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return next(error);
  }
};

exports.atualizarProduto = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensagem: "ID de produto invalido" });
    }

    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: req.params.id, criadoPor: req.usuario.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    return next(error);
  }
};

exports.deletarProduto = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensagem: "ID de produto invalido" });
    }

    const produtoRemovido = await Produto.findOneAndDelete({
      _id: req.params.id,
      criadoPor: req.usuario.id
    });

    if (!produtoRemovido) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    return res.status(200).json({ mensagem: "Produto removido com sucesso" });
  } catch (error) {
    return next(error);
  }
};

// Listar TODOS os produtos (de todos os usuários) + dados do criador
exports.listarTodosProdutos = async (req, res, next) => {
  try {
    const produtos = await Produto.find()
      .populate('criadoPor', 'name email')  // traz nome e email do usuário que criou
      .sort({ createdAt: -1 });

    return res.status(200).json(produtos);
  } catch (error) {
    return next(error);
  }
};
