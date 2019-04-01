const mongo = require('mongodb')

exports.showGame = function(req, res, next) {
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
        game: req.session.game,
        user: req.session.user
      })
    }
  }
}