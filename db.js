const Database = require("better-sqlite3")

const db = new Database("database.db")

db.pragma("foreign_keys = ON")

db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        create_at TEXT NOT NULL DEFAULT(datetime('now'))
    );  

    CREATE TABLE IF NOT EXISTS tasks (
        project_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1)),
        create_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );
    `)

module.exports = db