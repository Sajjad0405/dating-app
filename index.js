const express = require('express');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const port = 8000;

const app = express();

var data = [];

let upload = multer({dest: 'static/uploads/'})

// view engine setup
app

   .set('view engine', 'ejs')
   .set('views', 'views')
   .use('/static', express.static('static'))
   .use(bodyParser.urlencoded({ extended: false}))

   .get('/', home)
   .get('/about', about)
   .get('/profile', profile)
   .get('/game', game)

   .post('/', upload.single('image'), addGame)
   .get('/:id', gameDetail)
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

function game (req, res) {
  res.render('game.ejs');
}

function addGame (req, res) {
  var id = slug(req.body.gameNaam).toLowerCase();

  data.push({
    id: id,
    gameNaam: req.body.gameNaam,
    console: req.body.console,
    type: req.body.type,
    image: req.file ? req.file.filename : null
  })

  res.redirect('/' + id);
  return data;
}

function gameDetail (req, res) {
  res.render('profile.ejs', {data});
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
