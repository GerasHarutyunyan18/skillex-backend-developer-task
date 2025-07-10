const mysql = require("mysql2/promise");
const config = require("./config");

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${config.db.name}\`;`,
  );
  await connection.end();

  const dbConnection = await mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
  });

  return dbConnection;
}

module.exports = initializeDatabase;
