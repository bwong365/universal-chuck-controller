const express = require('express');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.route('/').get(index);
app.route('/chuck').get((req, res) => getChuck(req, res, false));
app.route('/chuck/:translate').get((req, res) => getChuck(req, res, true));

// learning is fun!
app.get('/test', (req, res) => {
  res.send(req.query);
}).get('/test/:text', (req, res) => {
  res.send(req.params);
});


function index(req, res) {
  res.send('Hi!');
}

// Route both requests through here
function getChuck(req, res, translate) {
  console.log(translate ? 'translate hit!' : 'hit!')
  const chuckAPI = 'https://api.chucknorris.io/jokes/random';
  const langAPI = 'https://api.funtranslations.com/translate';
  const lang = req.params;
  const text = req.query.text;

  axios.get(chuckAPI)
    .then(fact => {
      res.send(fact.data.value);
    })
    .catch(err => {
      console.log(err);
      res.status(300).send(err);
    });
}
