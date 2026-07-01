const pool = require("../config/database");

async function buscarPorNick(nick) {
  const [rows] = await pool.query(
    "SELECT id_usuario, nick, senha FROM usuarios WHERE nick = ?",
    [nick]
  );
  return rows[0] || null;
}

async function buscarPorId(idUsuario) {
  const [rows] = await pool.query(
    "SELECT id_usuario, nick FROM usuarios WHERE id_usuario = ?",
    [idUsuario]
  );
  return rows[0] || null;
}

module.exports = {
  buscarPorNick,
  buscarPorId
};
