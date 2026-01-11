import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "./chat.db",
  driver: sqlite3.Database,
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
