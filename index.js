const express = require('express');
const slug = require('slug');
const bodyParser = require('body-parser');
const port = 8000;

const app = express();

var data = [];

// view engine setup
app

   .set('view engine', 'ejs')
   .set('views', 'views')
   .use('/static', express.static('static'))
   .use(bodyParser.urlencoded({ extended: false}))

   .get('/', home)
   .get('/about', about)
   .get('/profile', profile)
   .get('/hobby', hobby)
   .post('/', addHobby)
   .get('/:id', hobbyDetail)
   .delete('/:id', remove)

   .listen(port)

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
    leeftijd: req.body.leeftijd
  })

  res.redirect('/' + id);
  return data;
}

function hobbyDetail (req, res) {
  res.render('index.ejs', {data});
  console.log({data});
}

function remove(req, res) {
    let id = req.params.id;

    console.log(id);

    data = data.filter(function (value) {
        return value.id !== id;
    })

    res.json({status: 'ok'});
}
