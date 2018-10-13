const express = require('express');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port);

app.route('/').get(index);
//app.route('/chuck')


function index(req, res) {
  res.send('Hi!');
}