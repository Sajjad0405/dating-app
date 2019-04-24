const slug = require('slug');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.addGame = function (req, res, next) {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    db.collection('Games').insertOne({
      id: slug(req.body.gameNaam).toLowerCase(),
      gameNaam: req.body.gameNaam,
      console: req.body.console,
      type: req.body.type,
      password: hash,
      gameImage: req.file ? req.file.filename : null
    }, done)
  })

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      req.session.game = {
        id: data.insertedId,
        gameNaam: req.body.gameNaam
      }
    }
    res.redirect('/game/' + data.insertedId)
  }
}