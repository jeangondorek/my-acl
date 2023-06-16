const sqlite3 = require('sqlite3').verbose();

const createDb = () => {
  const db = new sqlite3.Database('database.db');

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        token VARCHAR(36) NOT NULL,
        is_admin INTEGER NOT NULL DEFAULT 0
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS lists (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        user_id VARCHAR(36) NOT NULL REFERENCES users(id)
      )
    `);
  });

  db.close();
};

export { createDb };
