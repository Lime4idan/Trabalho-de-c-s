const pool = require("../config/database");

async function criar({ nome, telefone, status }) {
  const [result] = await pool.query(
    "INSERT INTO clientes (nome, telefone, status) VALUES (?, ?, ?)",
    [nome, telefone, status || "medio"]
  );
  return buscarPorId(result.insertId);
}

async function listarTodos() {
  const [rows] = await pool.query(
    "SELECT id_cliente, nome, telefone, status FROM clientes ORDER BY nome"
  );
  return rows;
}

async function buscarPorId(id) {
  const [rows] = await pool.query(
    "SELECT id_cliente, nome, telefone, status FROM clientes WHERE id_cliente = ?",
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
  if (dados.telefone !== undefined) {
    campos.push("telefone = ?");
    valores.push(dados.telefone);
  }
  if (dados.status !== undefined) {
    campos.push("status = ?");
    valores.push(dados.status);
  }

  if (campos.length === 0) {
    return buscarPorId(id);
  }

  valores.push(id);
  const [result] = await pool.query(
    `UPDATE clientes SET ${campos.join(", ")} WHERE id_cliente = ?`,
    valores
  );

  if (result.affectedRows === 0) return null;
  return buscarPorId(id);
}

async function deletar(id) {
  const [result] = await pool.query(
    "DELETE FROM clientes WHERE id_cliente = ?",
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
