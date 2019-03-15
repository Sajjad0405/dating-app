const express = require('express');
const slug = require('slug');
const bodyParser = require('body-parser');
const port = 8000;

const app = express();


var data = [];

// view engine setup

app


   .set('view engine', 'ejs');
   .set('views', 'views');
   .use('/static', express.static('static'));
   .use(bodyParser.urlencoded({ extended: false}))


   .get('/', home)
   .get('/about', about)
   .get('/profile', profile)
   .get('/hobby', hobby)
   .post('/', addHobby)
   .get('/:id', hobbyDetail)


function home (req, res) {

  res.render('index.ejs', {data});
}

function about (req, res) {
    res.render('about.ejs');
}

function profile (req, res) {
    res.render('profile.ejs', {data});
}

function hobby (req, res) {
  res.render('hobby.ejs');
}

function addHobby (req, res) {
  var id = slug(req.body.voornaam).toLowerCase();

  data.push({
    id: id,
    voornaam: req.body.voornaam,
    achternaam: req.body.achternaam,
    leeftijd: req.body.leeftijd,
    dansen: req.body.dansen ? true : false,
    gamen: req.body.gamen ? true : false
  })

  res.redirect('/' + id);
  return data;
}

function hobbyDetail (req, res) {
  res.render('index.ejs', {data});
  console.log({data});
}

app.listen(port);
