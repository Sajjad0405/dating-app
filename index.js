const express = require('express');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');
const session = require('express-session');

require('dotenv').config();

const port = 8000;
const app = express();


let upload = multer({
  dest: 'static/uploads/',
  limits: {fileSize: 5000000}
})

let url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongo.MongoClient.connect(url, function (err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})


// view engine setup
app

    // Setup ejs templating engine and the static folder
   .set('view engine', 'ejs')
   .set('views', 'views')
   .use('/static', express.static('static'))
   .use(bodyParser.urlencoded({ extended: false}))
   .use(session({
     resave: false,
     saveUninitialized: true,
     secret: process.env.SESSION_SECRET,
     cookie: {}
   }))

   .get('/', home)
   .get('/about', about)
   .get('/profile', profile)
   .get('/game', game)
   .get('/game/:id', showGame) // weergeeft een losse game

   .post('/', upload.single('gameImage'), addGame)
   .get('/', gameDetail) //weergeeft alle games
   .delete('/game/:id', remove)

   .listen(port)

   
function showGame(req, res, next) {
  var id = req.params.id

  db.collection('Games').findOne({
    _id: mongo.ObjectID(id)
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('showgame.ejs', {data})
    }
  }
}

function home (req, res) {

  db.collection('Games').find().toArray(done)

  function done(err, data) {
    if(err) {
      next(err)
    } else {
      res.render('index.ejs', {data})
    }
  }
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

  db.collection('Games').insertOne({

    id: slug(req.body.gameNaam).toLowerCase(),
    gameNaam: req.body.gameNaam,
    console: req.body.console,
    type: req.body.type,
    gameImage: req.file ? req.file.filename : null
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      req.session.user = {data}
      res.redirect('/game/' + data.insertedId) 
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
