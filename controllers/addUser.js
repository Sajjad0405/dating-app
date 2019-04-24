const bodyParser = require('body-parser');
const slug = require('slug');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

exports.addUser = function (req, res, next) {
  db.collection('Users').insertOne({
    id: req.body.username,
    email: req.body.email,
    password: req.body.password
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      req.session.user = {
        id: data.insertedId,
        email: req.body.email
      }
    }
    res.redirect('/' + data.insertedId)
  }
}