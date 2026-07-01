const pool = require("../config/database");

function normalizarValorItem(item) {
  return item.valor ?? item.valor_unitario;
}

async function buscarItensPorPedido(idPedido) {
  const [rows] = await pool.query(
    `SELECT pp.produtos_id_produto, pp.pedidos_id_pedido, pp.quantidade,
            pp.valor, pr.nome AS produto_nome
     FROM produtos_pedidos pp
     INNER JOIN produtos pr ON pr.id_produto = pp.produtos_id_produto
     WHERE pp.pedidos_id_pedido = ?`,
    [idPedido]
  );
  return rows;
}

async function montarPedidoComItens(pedido) {
  if (!pedido) return null;
  const itens = await buscarItensPorPedido(pedido.id_pedido);
  return { ...pedido, itens };
}

async function criar({ data, clientes_id_cliente, itens }) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [resultPedido] = await connection.query(
      "INSERT INTO pedidos (data, clientes_id_cliente) VALUES (?, ?)",
      [data, clientes_id_cliente]
    );

    const idPedido = resultPedido.insertId;

    for (const item of itens) {
      const produtoId = item.produto_id || item.produtos_id_produto;
      const valor = normalizarValorItem(item);

      await connection.query(
        `INSERT INTO produtos_pedidos
         (produtos_id_produto, pedidos_id_pedido, quantidade, valor)
         VALUES (?, ?, ?, ?)`,
        [produtoId, idPedido, item.quantidade, valor]
      );
    }

    await connection.commit();
    return buscarPorId(idPedido);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function listarTodos() {
  const [pedidos] = await pool.query(
    `SELECT p.id_pedido, p.data, p.clientes_id_cliente, c.nome AS cliente_nome
     FROM pedidos p
     INNER JOIN clientes c ON c.id_cliente = p.clientes_id_cliente
     ORDER BY p.data DESC, p.id_pedido DESC`
  );

  return Promise.all(pedidos.map((pedido) => montarPedidoComItens(pedido)));
}

async function buscarPorId(id) {
  const [rows] = await pool.query(
    `SELECT p.id_pedido, p.data, p.clientes_id_cliente, c.nome AS cliente_nome
     FROM pedidos p
     INNER JOIN clientes c ON c.id_cliente = p.clientes_id_cliente
     WHERE p.id_pedido = ?`,
    [id]
  );

  return montarPedidoComItens(rows[0] || null);
}

async function atualizar(id, dados) {
  const campos = [];
  const valores = [];

  if (dados.data !== undefined) {
    campos.push("data = ?");
    valores.push(dados.data);
  }
  if (dados.clientes_id_cliente !== undefined) {
    campos.push("clientes_id_cliente = ?");
    valores.push(dados.clientes_id_cliente);
  }

  if (campos.length === 0) {
    return buscarPorId(id);
  }

  valores.push(id);
  const [result] = await pool.query(
    `UPDATE pedidos SET ${campos.join(", ")} WHERE id_pedido = ?`,
    valores
  );

  if (result.affectedRows === 0) return null;
  return buscarPorId(id);
}

async function deletar(id) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      "DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?",
      [id]
    );

    const [result] = await connection.query(
      "DELETE FROM pedidos WHERE id_pedido = ?",
      [id]
    );

    await connection.commit();
    return result.affectedRows > 0;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  criar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};
