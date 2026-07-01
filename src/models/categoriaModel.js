const pool = require("../config/database");

async function criar(nome) {
  const [result] = await pool.query(
    "INSERT INTO categorias (nome) VALUES (?)",
    [nome]
  );
  return buscarPorId(result.insertId);
}

async function listarTodos() {
  const [rows] = await pool.query(
    "SELECT id_categoria, nome FROM categorias ORDER BY nome"
  );
  return rows;
}

async function buscarPorId(id) {
  const [rows] = await pool.query(
    "SELECT id_categoria, nome FROM categorias WHERE id_categoria = ?",
    [id]
  );
  return rows[0] || null;
}

async function atualizar(id, nome) {
  const [result] = await pool.query(
    "UPDATE categorias SET nome = ? WHERE id_categoria = ?",
    [nome, id]
  );
  if (result.affectedRows === 0) return null;
  return buscarPorId(id);
}

async function deletar(id) {
  const [result] = await pool.query(
    "DELETE FROM categorias WHERE id_categoria = ?",
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
