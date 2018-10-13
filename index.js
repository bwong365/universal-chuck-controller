const express = require('express');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port);

app.route('/').get(index);
app.route('/chuck').get((req, res) => getChuck(req, res, false));
app.route('/chuck/:translate').get((req, res) => getChuck(req, res, true));

function index(req, res) {
  res.send('Hi!');
}

function getChuck(req, res, translate) {
  if (translate) console.log('translating');
  console.log(req.query);
}