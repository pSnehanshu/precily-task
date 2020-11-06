const _ = require('lodash');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const dbPromise = require('./db');

app.use(cors());
app.use(bodyParser.json());

app.post('/add', async (req, res) => {
  const windowId = _.get(req, 'body.windowId');
  const content = _.get(req, 'body.content');

  if (!(windowId && content)) {
    return res.sendStatus(400);
  }

  try {
    const db = await dbPromise;
    await db.run('DELETE FROM content WHERE windowId = ?', windowId);
    await db.run('INSERT INTO content (windowId, content) VALUES (?, ?)', [windowId, content]);
    await db.run('UPDATE counter SET `add` = `add` + 1');
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get('/count', (req, res) => dbPromise
  .then((db) => db.get('SELECT * FROM counter'))
  .then((data) => res.json(data))
  .catch((err) => res.status(500).send(err.message)));

module.exports = app;
