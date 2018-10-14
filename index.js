const express = require('express');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  next();
});

app.route('/').get(index);
app.route('/chuck').get((req, res) => getChuck(req, res, false));
app.route('/chuck/:lang').get((req, res) => getChuck(req, res, true));


function index(req, res) {
  res.send('Hi!');
}

// Route both requests through here
function getChuck(req, res, translate) {
  console.log(translate ? 'translate hit!' : 'hit!')
  const chuckAPI = 'https://api.icndb.com/jokes/random?limitTo=[nerdy]'; //exclude=[explicit]
  const langAPI = 'https://api.funtranslations.com/translate/';
  const lang = req.params.lang + '?text=';
  
  axios.get(chuckAPI)
    .then(json => {
      
      // Basic fact
      const fact = json.data.value.joke
      if (!translate) {
        res.send(fact);

      // Translated fact
      } else {
        const fact = encodeURI(json.data.value.joke);
  
        // Get translation!
        axios.get(langAPI + lang + fact)
          .then(json => { 
            res.send(json.data.contents.translated);
          })
          .catch(err => {
            console.log(error);
          });
      }
    })

    // Something went wrong
    .catch(err => {
      console.log(err);
      res.status(300).send(err);
    });
}


// learning is fun!
app.get('/test', (req, res) => {
  res.send(req.query);
}).get('/test/:text', (req, res) => {
  res.send(req.params);
});

