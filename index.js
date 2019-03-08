const express = require('express');
const port = 8000;

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'))

app.get('/', test)
app.get('/about', about)
app.get('/profile', profile)

function test (req, res) {
    res.render('index.pug');
}

function about (req, res) {
    res.render('about.pug');
}

function profile (req, res) {
    res.render('profile.pug');
}

app.listen(port);