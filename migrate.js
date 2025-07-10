const initializeDatabase = require("./db");
const { itemMigration } = require("./migrations/001-create-items-scheme");
const {
  combinationMigration,
} = require("./migrations/002-create-combination-scheme");
const {
  responseMigration,
} = require("./migrations/003-create-response-scheme");

(async () => {
  const connection = await initializeDatabase();

  try {
    const migrations = [
      { name: "create-item-migration", migration: itemMigration },
      { name: "create-combination-migration", migration: combinationMigration },
      { name: "create-response-migration", migration: responseMigration },
    ];

    for (const migrationItem of migrations) {
      console.log(`Running migration: ${migrationItem.name}`);
      await connection.query(migrationItem.migration);
      console.log(`Migration ${migrationItem.name} completed successfully.`);
    }

    console.log("All migrations ran successfully.");
  } catch (err) {
    console.error("Error running migration:", err);
  } finally {
    await connection.end();
  }
})();
