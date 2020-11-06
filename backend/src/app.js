const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const dbPromise = require('./db');

app.use(cors());
app.use(bodyParser.json());

app.get('/count', (req, res) => dbPromise
  .then((db) => db.get('SELECT * FROM counter'))
  .then((data) => res.json(data)));

module.exports = app;
