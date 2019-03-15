const express = require('express');
const slug = require('slug');
const bodyParser = require('body-parser');
const port = 8000;

const app = express();


var data = [
  {
    naam: 'Jaap',
    interest: 'Dansen',
    geslacht: 'Man'
  },
  {
    naam: 'Marie',
    interest: 'Voetballen',
    geslacht: 'Vrouw'
  }
];

// view engine setup
app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use('/static', express.static('static'))


  .get('/', home)
  .get('/about', about)
  .get('/profile', profile)


function home (req, res) {

  res.render('index.ejs', {data});
}

function about (req, res) {
    res.render('about.ejs');
}

function profile (req, res) {
    res.render('profile.ejs', {data});
}

app.listen(port);
