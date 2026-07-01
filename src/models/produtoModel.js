const pool = require("../config/database");

async function criar({ nome, valor, estoque, categorias_id_categoria }) {
  const [result] = await pool.query(
    `INSERT INTO produtos (nome, valor, estoque, categorias_id_categoria)
     VALUES (?, ?, ?, ?)`,
    [nome, valor, estoque, categorias_id_categoria]
  );
  return buscarPorId(result.insertId);
}

async function listarTodos() {
  const [rows] = await pool.query(
    `SELECT p.id_produto, p.nome, p.valor, p.estoque, p.categorias_id_categoria,
            c.nome AS categoria_nome
     FROM produtos p
     INNER JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
     ORDER BY p.nome`
  );
  return rows;
}

async function buscarPorId(id) {
  const [rows] = await pool.query(
    `SELECT p.id_produto, p.nome, p.valor, p.estoque, p.categorias_id_categoria,
            c.nome AS categoria_nome
     FROM produtos p
     INNER JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
     WHERE p.id_produto = ?`,
    [id]
  );
  return rows[0] || null;
}

async function atualizar(id, dados) {
  const campos = [];
  const valores = [];

  if (dados.nome !== undefined) {
    campos.push("nome = ?");
    valores.push(dados.nome);
  }
  if (dados.valor !== undefined) {
    campos.push("valor = ?");
    valores.push(dados.valor);
  }
  if (dados.estoque !== undefined) {
    campos.push("estoque = ?");
    valores.push(dados.estoque);
  }
  if (dados.categorias_id_categoria !== undefined) {
    campos.push("categorias_id_categoria = ?");
    valores.push(dados.categorias_id_categoria);
  }

  if (campos.length === 0) {
    return buscarPorId(id);
  }

  valores.push(id);
  const [result] = await pool.query(
    `UPDATE produtos SET ${campos.join(", ")} WHERE id_produto = ?`,
    valores
  );

  if (result.affectedRows === 0) return null;
  return buscarPorId(id);
}

async function deletar(id) {
  const [result] = await pool.query(
    "DELETE FROM produtos WHERE id_produto = ?",
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  criar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};
