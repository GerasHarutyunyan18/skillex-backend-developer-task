const initializeDatabase = require("../db");

async function createCombination(combination) {
  const db = await initializeDatabase();

  try {
    await db.query("START TRANSACTION");

    const [result] = await db.query(
      "INSERT INTO combinations (combination) VALUES (?)",
      [JSON.stringify(combination)],
    );

    await db.query("COMMIT");
    return result.insertId;
  } catch (error) {
    await db.query("ROLLBACK");
    console.error(
      "[create-combination]Failed to insert combination:",
      error.message,
    );
    throw error;
  } finally {
    await db.end();
  }
}

async function createResponse(items, length, combinationId) {
  const db = await initializeDatabase();

  try {
    await db.query("START TRANSACTION");

    const [res] = await db.query(
      "INSERT INTO responses (length, items, combination_id) VALUES (?, ?, ?)",
      [length, JSON.stringify(items), combinationId],
    );

    const responseId = res.insertId;

    const [combRows] = await db.query(
      "SELECT combination FROM combinations WHERE id = ?",
      [combinationId],
    );

    if (combRows.length === 0) {
      throw new Error("Related combination not found");
    }

    await db.query("COMMIT");

    return {
      id: responseId,
      combination: combRows[0].combination,
    };
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("[create-response]Failed to insert response:", error.message);
    throw error;
  } finally {
    await db.end();
  }
}

async function createItem(value) {
  const db = await initializeDatabase();

  try {
    await db.query("START TRANSACTION");

    await db.query("INSERT INTO items (value) VALUES (?)", [value]);

    await db.query("COMMIT");
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("[create-item]Failed to insert item:", error.message);
  } finally {
    await db.end();
  }
}

module.exports = { createCombination, createResponse, createItem };
