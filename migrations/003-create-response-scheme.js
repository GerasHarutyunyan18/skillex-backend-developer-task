const responseMigration = `
  CREATE TABLE IF NOT EXISTS responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    length INT NOT NULL,
    items JSON NOT NULL, -- array of numbers
    combination_id INT UNIQUE, -- one-to-one relationship
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (combination_id) REFERENCES combinations(id) ON DELETE CASCADE
  );
  `;

module.exports = { responseMigration };
