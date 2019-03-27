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
   .get('/profile', redirectLogin ,profile)
   .get('/game', redirectLogin, game)
   .get('/game/:id', redirectLogin, showGame) // weergeeft een losse game
   .get('/login', login)
   .get('/:id', redirectLogin, showUser)
   .get('/:id/logout', redirectLogin, logOut)
   

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

function redirectLogin(req, res, next) {
  if (!req.session.user) {
      res.redirect('/login');
  } else {
      next();
  }
}

function showUser(req, res) {
  let id = req.params.id;
  db.collection('Users').findOne({
      _id: mongo.ObjectID(id)
  }, function(err, data) {
      if (err) {
          console.log('An error has occured', err);
      } else {
          res.render('user.ejs', {
              data,
              user: req.session.user
          });
      }
  });
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
      console.log(req.session.user)
      res.render('profile.ejs', {
        data,
        game: req.session.game,
        user: req.session.user
      })
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
        gameNaam: req.body.gameNaam,
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

//Check if user has the correct credentials to login
function checkUser(req, res) {
  db.collection('Users').find().toArray(done)

  function done(err, data) {
    for(let i = 0; i < data.length; i++) {
      if(err) {
        console.log("An error has occured", err);
      } else if (req.body.username.toLowerCase() === data[i].username && req.body.password === data[i].password) {
        let id = data[i]._id;

        req.session.user = {
          id: id,
          username: req.body.username,
          password: req.body.password,
          age: data[i].age,
          gender: data[i].gender,
          profilePic: data[i].profilePic
        };
        res.redirect('/' + id);
      } else {
        res.redirect('/login.ejs');
      }
    }
  }
}

//Remove a game
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
    }
}

//Logout as a user and get redirected to index/home. The session gets destoyed!
function logOut(req, res) {
  req.session.destroy(function (err) {
      if (err) {
          console.log("An error has occured", err);
      } else {
          res.redirect('/');
      }
  });
}