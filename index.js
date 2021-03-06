const express = require('express');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');
const session = require('express-session');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 8000
let upload = multer({
  dest: 'static/uploads/',
  limits: {fileSize: 5000000}
})

let url = process.env.MONGODB_URI

mongo.MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})

const home = require('./controllers/home.js')
const about = require('./controllers/about.js');
const addGame = require('./controllers/addGame.js');
const showUser = require('./controllers/showUser.js');
const pageNotFound = require('./controllers/pageNotFound.js');
const profile = require('./controllers/profile.js');
const game = require('./controllers/game.js')
const showGame = require('./controllers/showGame.js')
const login = require('./controllers/login.js')
const gameDetail = require('./controllers/gameDetail.js')
const checkUser = require('./controllers/checkUser.js')
const remove = require('./controllers/remove.js')
const logOut = require('./controllers/logOut.js')
const redirectLogin = require('./controllers/redirectLogin.js')

const app = express();
// Some basic methods which use express
app
    // Setup ejs templating engine and the static folder
   .set('view engine', 'ejs')
   .set('views', 'views')

   //Check the static folder when trying to serve static files like CSS, JS
   .use('/static', express.static('static'))

   //Using the express session as following
   .use(session({
     resave: false,
     saveUninitialized: true,
     secret: process.env.SESSION_SECRET
   }))

   //Parses strings
   .use(bodyParser.urlencoded({ extended: false}))

   //All the routes which i use
   .get('/', home.home)
   .get('/about', about.about)
   .get('/profile', redirectLogin.redirectLogin ,profile.profile)
   .get('/game', redirectLogin.redirectLogin, game.game)
   .get('/', gameDetail.gameDetail) //view all games
   .get('/game/:id', redirectLogin.redirectLogin, showGame.showGame) // view a single game
   .get('/login', login.login)
   .get('/:id', redirectLogin.redirectLogin, showUser.showUser)
   .get('/:id/logout', redirectLogin.redirectLogin, logOut.logOut)
   .post('/', upload.single('gameImage'), addGame.addGame)
   .post('/login', checkUser.checkUser)
   .delete('/game/:id', remove.remove)

   .use(pageNotFound.pageNotFound)

   .listen(port)


//Sources which i used
//https://www.npmjs.com/package/body-parser
//https://www.npmjs.com/package/express-session
//https://stackoverflow.com/questions/32264612/is-express-session-not-working-with-express-4-13
//https://www.youtube.com/watch?v=hE5zeEiVqpw -> To get a hang on express sessions
//https://docs.mongodb.com/manual/reference/operator/aggregation/add/
//https://docs.mongodb.com/manual/reference/method/db.collection.insert/
//https://www.w3resource.com/mongodb/shell-methods/collection/db-collection-remove.php
//https://www.npmjs.com/package/multer -> used for uploading files
//https://www.npmjs.com/package/slug -> Makes strings url save according to npmjs.com
// Rijk helped me setting up the routes in a better and logical way, also he helped me aquiring the image from the static folder
//Kaan helped me alot through out the project. Like helped me debugging and helped solve the errors which i had