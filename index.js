const express = require('express');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');
const session = require('express-session');

require('dotenv').config();

const port = 8000;
const app = express();


let data = []

let upload = multer({
  dest: 'static/uploads/',
  limits: {fileSize: 5000000}
})

let url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongo.MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})


// view engine setup
app

    // Setup ejs templating engine and the static folder
   .set('view engine', 'ejs')
   .set('views', 'views')
   .use('/static', express.static('static'))
   .use(session({
     resave: false,
     saveUninitialized: true,
     secret: process.env.SESSION_SECRET
   }))
   .use(bodyParser.urlencoded({ extended: false}))
   .use(bodyParser.json())

   .get('/', home)
   .get('/about', about)
   .get('/profile', profile)
   .get('/game', game)
   .get('/game/:id', showGame) // weergeeft een losse game
   .get('/login', login)
   

   .post('/', upload.single('gameImage'), addGame)
   .post('/login', checkUser)
   .get('/', gameDetail) //weergeeft alle games
   .delete('/game/:id', remove)

   .use(pageNotFound)
   


   .listen(port)


function home (req, res) {

  db.collection('Users').find().toArray(done)

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

//Manier van Kaan gebruikt. Bron: https://github.com/cenikk/datingapp/blob/master/index.ejs
function pageNotFound(req, res) {
  res.status(404).render('404.ejs');
}

function profile (req, res) {
  
  db.collection('Games').find().toArray(done)

  function done(err, data) {
    if(err) {
      next(err)
    } else {
      // req.session.game
      res.render('profile.ejs', {data, game: req.session.game})
      // console.log(req.session.game);    
    }
  }
}

function game (req, res) {
  res.render('game.ejs');
}

function login (req, res) { 
  res.render('login.ejs')
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
      req.session.game = {
        id: data.insertedId,
        gameNaam: req.body.gameNaam
      };     
    }
    res.redirect('/game/' + data.insertedId)
  }
  
}

function showGame(req, res, next) {
  console.log(req.session.game);
  let id = req.params.id

  db.collection('Games').findOne({
    _id: mongo.ObjectID(id)
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      req.session.game
      res.render('showgame.ejs', {
        data,
        game: req.session.game        
      })
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

function checkUser(req, res) {
  console.log(req.body.username)
  db.collection('Users').find().toArray(done)
  
  function done(err, data) {
    for(let i = 0; i < data.length; i++) {
      if(err) {
        console.log("An error has occured", err);
      } else if (req.body.username.toLowerCase() === data[i].username && req.body.password === data[i].password) {
        let id = data[i]._id;

        req.session.user = {
          id: data.insertedId,
          username: req.body.username,
          password: req.body.password
        };
        res.redirect('/');
      }
    }
  }
}

function remove(req, res) {

    let id = req.params.id

    db.collection('Games').deleteOne({
      _id: mongo.ObjectID(id)
    }, done)
    function done(err) {
      if (err) {
        next(err)
      } else {
        res.json({status: 'ok'})
      }

      // req.session.destroy;
      // console.log(req.session)
    }
}
