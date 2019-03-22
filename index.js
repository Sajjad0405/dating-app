const express = require('express');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');

require('dotenv').config();

const port = 8000;
const app = express();

let data = [];
let upload = multer({dest: 'static/uploads/'})

let url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongo.MongoClient.connect(url, function (err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})


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

function addGame (req, res, next) {

  db.collection("Games").insertOne({

    id: slug(req.body.gameNaam).toLowerCase(),
    gameNaam: req.body.gameNaam,
    console: req.body.console,
    type: req.body.type
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/' + data.insertedId) 
    }
  }
}

function gameDetail (req, res) {

  db.collection('Games').find().toArray(done)

  function done(err, data) {
    if(err) {
      next(err)
    } else {
      res.render('profile.ejs', {data})
    }
  }
}

function remove(req, res) {

    var id = req.params.id
    db.collection('Games').deleteOne({
      _id: mongo.ObjectID(id)
    }, done)
  
    function done(err) {
      if (err) {
        next(err)
      } else {
        res.json({status: 'ok'})
      }
    }
}
