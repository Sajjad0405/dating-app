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

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/static', express.static('static'));


app.get('/', home)
app.get('/about', about)
app.get('/profile', profile)


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
