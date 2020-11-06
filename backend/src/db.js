const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

module.exports = open({
  filename: path.join(__dirname, '..', 'db.sqlite'),
  driver: sqlite3.cached.Database,
}).then(async (db) => {
  const contentTable = db.run(`CREATE TABLE IF NOT EXISTS "content" (
    "windowId" VARCHAR(100),
    "content" VARCHAR(500),
    PRIMARY KEY("windowId")
  );`);

  const counterTable = db.run(`CREATE TABLE IF NOT EXISTS "counter" (
    "add" INTEGER,
    "update" INTEGER
  );`).then(() => db.run(`
    INSERT INTO counter("add", "update") 
    SELECT 0, 0 
    WHERE NOT EXISTS(SELECT * FROM counter);`));

  await Promise.all([contentTable, counterTable]);

  return db;
});
