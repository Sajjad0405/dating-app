const express = require('express');

var data = [{
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
express()

  .set('view engine', 'ejs')
  .set('views', 'views')
  .use('/static', express.static('static'))


  .get('/', home)
  .get('/about', about)
  .get('/profile', profile)

  .listen(8000)


function home(req, res) {

  res.render('index.ejs', {
    data
  });
}

function about(req, res) {
  res.render('about.ejs');
}

function profile(req, res) {
  res.render('profile.ejs', {
    data
  });
}