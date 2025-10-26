const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'db.sqlite');

let db;

function runAsync(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function allAsync(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  init: () => {
    return new Promise((resolve, reject) => {
      db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) return reject(err);
        // create table if not exists
        const createTable = `
          CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            concluido INTEGER DEFAULT 0,
            dataCriacao DATETIME DEFAULT (datetime('now','localtime'))
          );
        `;
        db.run(createTable, (err2) => {
          if (err2) return reject(err2);
          resolve();
        });
      });
    });
  },

  createTask: async ({ titulo, descricao = null, concluido = false }) => {
    const sql = 'INSERT INTO tarefas (titulo, descricao, concluido) VALUES (?, ?, ?)';
    const result = await runAsync(sql, [titulo, descricao, concluido ? 1 : 0]);
    const id = result.lastID;
    const created = await allAsync('SELECT * FROM tarefas WHERE id = ?', [id]);
    return created[0];
  },

  getTasks: async () => {
    return await allAsync('SELECT * FROM tarefas ORDER BY id DESC');
  },

  deleteTask: async (id) => {
    const sql = 'DELETE FROM tarefas WHERE id = ?';
    await runAsync(sql, [id]);
  },

  updateTask: async (id, { concluido }) => {
    const sql = 'UPDATE tarefas SET concluido = ? WHERE id = ?';
    await runAsync(sql, [concluido ? 1 : 0, id]);
  }
};
