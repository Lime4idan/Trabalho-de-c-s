require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const ARQUIVOS_SQL = ["Dump20260622.sql", "loja.sql"];

function encontrarArquivoSql() {
  const arquivoPreferido = process.env.SQL_FILE;
  if (arquivoPreferido) {
    const caminho = path.join(__dirname, "..", arquivoPreferido);
    if (fs.existsSync(caminho)) return caminho;
    throw new Error(`Arquivo SQL definido em SQL_FILE não encontrado: ${arquivoPreferido}`);
  }

  for (const nome of ARQUIVOS_SQL) {
    const caminho = path.join(__dirname, "..", nome);
    if (fs.existsSync(caminho)) return caminho;
  }

  throw new Error(
    "Nenhum arquivo SQL encontrado. Coloque Dump20260622.sql ou loja.sql na raiz do projeto."
  );
}

/**
 * Expande comentários condicionais do mysqldump: /*!40101 ... *\/ → SQL interno
 */
function expandirComentariosMysql(sql) {
  return sql.replace(/\/\*!\d+\s([\s\S]*?)\*\//g, "$1");
}

function removerComentariosLinha(sql) {
  return sql
    .split("\n")
    .map((linha) => {
      let resultado = "";
      let dentroString = false;

      for (let i = 0; i < linha.length; i++) {
        const char = linha[i];

        if (char === "'" && linha[i - 1] !== "\\") {
          dentroString = !dentroString;
          resultado += char;
          continue;
        }

        if (!dentroString && char === "-" && linha[i + 1] === "-") {
          break;
        }

        resultado += char;
      }

      return resultado;
    })
    .join("\n");
}

function dividirStatements(sql) {
  const statements = [];
  let atual = "";
  let dentroString = false;

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];

    if (char === "'" && sql[i - 1] !== "\\") {
      dentroString = !dentroString;
      atual += char;
      continue;
    }

    if (char === ";" && !dentroString) {
      const statement = atual.trim();
      if (statement.length > 0) {
        statements.push(statement);
      }
      atual = "";
      continue;
    }

    atual += char;
  }

  const restante = atual.trim();
  if (restante.length > 0) {
    statements.push(restante);
  }

  return statements;
}

function deveIgnorarStatement(statement) {
  return (
    /^LOCK\s+TABLES/i.test(statement) ||
    /^UNLOCK\s+TABLES/i.test(statement) ||
    /ALTER\s+TABLE.*DISABLE\s+KEYS/i.test(statement) ||
    /ALTER\s+TABLE.*ENABLE\s+KEYS/i.test(statement)
  );
}

function preprocessarDump(sqlBruto) {
  const expandido = expandirComentariosMysql(sqlBruto);
  const semComentarios = removerComentariosLinha(expandido);
  return dividirStatements(semComentarios).filter(
    (statement) => statement && !deveIgnorarStatement(statement)
  );
}

async function executarSql(connection, sqlBruto) {
  const statements = preprocessarDump(sqlBruto);

  for (const statement of statements) {
    if (/^SET\s+@/i.test(statement)) {
      try {
        await connection.query(statement);
      } catch {
        // variáveis de sessão do dump podem falhar fora do cliente mysql — ignora
      }
      continue;
    }

    await connection.query(statement);
  }
}

async function setupDatabase() {
  const dbName = process.env.DB_NAME || "loja";
  const caminhoSql = encontrarArquivoSql();
  const sql = fs.readFileSync(caminhoSql, "utf8");

  console.log(`Usando arquivo SQL: ${path.basename(caminhoSql)}`);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT) || 3306,
    multipleStatements: false
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE \`${dbName}\``);
    await executarSql(connection, sql);
    console.log(`Banco "${dbName}" configurado com sucesso.`);
  } finally {
    await connection.end();
  }
}

setupDatabase().catch((error) => {
  console.error("Erro ao configurar o banco de dados:", error.message || error);
  process.exit(1);
});
