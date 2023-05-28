const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ shapes: [] }).write();

app.get('/shapes', (req, res) => {
  const shapes = db.get('shapes').value();
  res.json(shapes);
});

app.post('/shapes', (req, res) => {
  const shape = req.body;
  db.get('shapes').push(shape).write();
  res.status(200).json(shape);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
